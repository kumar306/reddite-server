import { User } from "../entities/User";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {

    @Field(() => String)
    field: String;

    @Field(() => String)
    message: string
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@InputType()
export class RegisterInput {

    @Field(() => String)
    username!: string;

    @Field(() => String)
    email!: string;

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
export class LoginInput {

    @Field(() => String)
    usernameOrEmail!: string;

    @Field(() => String)
    password!: string;
}

@InputType()
export class PasswordResetInput {

    @Field(() => String)
    newPassword!: string;

    @Field(() => String)
    confirmNewPassword!: string;

    @Field(() => String)
    token!: string;
}

type RegisterFields = {
    username?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
}


export const validateFields = (options: RegisterFields) => {
    if (options.username.includes('@'))
            return [
                {
                    field: 'username',
                    message: 'cannot have \'@\' in username'
                }
            ]
        

        if (options.password != options.confirmPassword)
            return  [
                { field: 'password', message: 'Password and confirm password don\'t match' }
            ]
            

        if (!options.email.includes('@'))
            return [
                    {
                        field: 'email',
                        message: 'Email in invalid format'
                    }
                ]
            
     }

