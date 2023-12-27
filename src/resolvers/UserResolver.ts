import { hash, verify } from "argon2";
import { myContext } from "../context";
import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { COOKIE_ALIAS, FORGOT_PASSWORD_PREFIX } from "../constants";
import { UserResponse, RegisterInput, LoginInput, validateFields, PasswordResetInput } from "../utils/userValidation";
import {v4 as uuidv4} from 'uuid';
import { sendMail } from "./../utils/sendEmail";

@Resolver()
export class UserResolver {

    //query user details of a particular user - username, first name, last name
    //whatever is being mentioned in query, mutation decorator - that object can be queried
    @Query(() => UserResponse)
    async getUserDetails(@Arg("username") username: string,
        @Ctx() { em, req }: myContext): Promise<UserResponse> {
        const user = await em.fork().findOne(User, { username });
        return { user };
    }

    //query if user is logged in by checking req.session of cookie sent by the browser
    @Query(() => UserResponse)
    async isLoggedIn(
        @Ctx() { em, req }: myContext): Promise<UserResponse> {
        console.log(req.session);
        if (!req.session.userId) return {
            errors: [{ field: 'user', message: 'the user is not logged in' }]
        };
        //if user is logged in, his req will have cookie containing encrypted session ID
        // on req, express session middleware unsigns that cookie and searches in redis store for that key
        //val of that key would be session details containing user session data we stored before
        //so req.session would contain that data, req.sessionID would give me the same init session ID of that user
        const user = await em.fork().findOne(User, { id: req.session.userId });
        return { user };
    }

    // register - provide first name, last name, username, password, confirm password
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: RegisterInput,
        @Ctx() { em }: myContext): Promise<UserResponse> {
        //create em fork to use
        const emFork = em.fork();
        //if pwd, confirm pwd dont match return err msg
        const errors = validateFields(options);
        if(errors) return { errors }

        // if user exists return err msg
        const existingUser: User = await emFork.findOne(User, { username: options.username });
        if (existingUser) return {
            errors: [{ field: 'username', message: 'User with username already exists' }]
        };

        options.password = await hash(options.password);
     
        const user = emFork.create(User, {
            username: options.username,
            password: options.password,
            email: options.email,
            fname: options.fname,
            lname: options.lname
        });
        await emFork.persistAndFlush(user);
        return { user };
    }

    // login - provide username, password
    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: LoginInput,
        @Ctx() { em, req, res }: myContext
    ): Promise<UserResponse> {
        const emFork = em.fork();
        let existingUser;
        if (options.usernameOrEmail.includes('@'))
            existingUser = await emFork.findOne(User, { email: options.usernameOrEmail });
        else
            existingUser = await emFork.findOne(User, { username: options.usernameOrEmail });

        if (!existingUser) return {
            errors: [{ field: 'usernameOrEmail', message: 'User doesn\'t exist' }]
        };
        const pwdMatches = await verify(existingUser.password, options.password);
        if (!pwdMatches) return {
            errors: [{ field: 'password', message: 'Incorrect password' }]
        };
        req.session.userId = existingUser.id;
        return { user: existingUser };
    }

    @Mutation(() => Boolean)
    logout(
        @Ctx() { em, req, res }: myContext
    ): Promise<Boolean> {
        return new Promise((myResolve, _) => {
            res.clearCookie(COOKIE_ALIAS);
            req.session.destroy(err => {
                console.log(err);
                myResolve(false);
            });
            myResolve(true);
        });
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Ctx() { em, redis }: myContext,
        @Arg('email') email: string
    ): Promise<Boolean> {

        // check if this email exists in db
        // if not there
            // just return true - dont want user to know if email there or not
        // if there
            // generate a uuid so we validate we know who user is
            // store in redis and attach to the fetched user's id
            // send user a email with link as http://localhost:3000/change-password/{uuid}
        
        const user = await em.fork().findOne(User, {email: email});
        if(!user) return true;
        let token = uuidv4();
        console.log("Generated token: "+ token);
        await redis.set(FORGOT_PASSWORD_PREFIX+token,user.id);
        await sendMail(email, 
            `<a href='http://localhost:3000/change-password/${token}'>Reset Password</a>`)
        return true;
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Ctx() { em, redis }: myContext,
        @Arg('options') options: PasswordResetInput
    ): Promise<UserResponse> {
        
        // access user from token
        // if user not found
            // send error that token not there
        // if found
            // check if password and confirm password matches
            // store hashed password into user
            // delete token from redis
      
        const emFork = em.fork();
        const userId:string = await redis.get(FORGOT_PASSWORD_PREFIX+options.token);
        console.log(userId);
        if(!userId) return {
            errors: [{
                    field: 'token',
                    message: 'Token has expired'
                }]
            }
        if(options.newPassword != options.confirmNewPassword) {
            return {
                errors: [{
                    field: 'newPassword',
                    message: 'password and confirm passwords do not match'
                }]
            }
        }
        const user = await emFork.findOne(User, {id: parseInt(userId) });
        user.password = await hash(options.newPassword);
        user.updatedAt = new Date();
        await emFork.flush();
        await redis.del(FORGOT_PASSWORD_PREFIX+options.token); 
        return { user }
    }

}
