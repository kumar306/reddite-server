import { argon2d, hash, verify } from "argon2";
import { myContext } from "../context";
import { User } from "../entities/User";
import { Arg, Args, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";

@InputType()
class RegisterInput {

    @Field(() => String)
    username!: string;

    @Field(() => String)
    password!: string;

    @Field(() => String)
    confirmPassword!: string;

    @Field(() => String)
    fname!: string;

    @Field(() => String)
    lname!: string;
}

@InputType()
class LoginInput {

    @Field(() => String)
    username!: string;

    @Field(() => String)
    password!: string;
}

@ObjectType()
class FieldError {

    @Field(() => String)
    field: String;

    @Field(() => String)
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {

    //query user details - username, first name, last name
    //whatever is being mentioned in query, mutation decorator - that object can be queried
    @Query(() => UserResponse)
    async getUserDetails(@Arg("username") username: string,
    @Ctx() {em}:myContext): Promise<UserResponse> {
        const user = await em.fork().findOne(User, {username});
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
            if(options.password != options.confirmPassword) 
            return {
                errors: [{field: 'password', message: 'Password and confirm password don\'t match'}],
                user: null
            };

            // if user exists return err msg
            const existingUser:User = await emFork.findOne(User, { username: options.username });
            if(existingUser) return {
                errors: [{ field: 'username', message: 'User with username already exists'}]
            };
            
            options.password = await hash(options.password);
            const user = emFork.create(User, {
                username: options.username,
                password: options.password,
                fname: options.fname,
                lname: options.lname
            });
            console.log(user);
            await emFork.persistAndFlush(user);
            return { user };
        } 

    // login - provide username, password
    @Mutation(() => User)
    async login(
        @Arg("options") options: LoginInput,
        @Ctx() {em}:myContext
    ): Promise<UserResponse> {
        const emFork = em.fork();
        const existingUser = await emFork.findOne(User, { username: options.username});
        if(!existingUser) return {
            errors: [{ field: 'username', message: 'User doesn\'t exist' }]
        }
        const pwdMatches = await verify(existingUser.password, options.password);
        if(!pwdMatches) return {
            errors: [{ field: 'password', message: 'Incorrect password' }]
        };
        
        return { user: existingUser }
    }   
}