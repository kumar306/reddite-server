import { InputType, Field } from "type-graphql";

@InputType()
export class PostInput {

    @Field(() => String)
    title!: string;

    @Field(() => String)
    text!: string;
}