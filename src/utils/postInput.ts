import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PostInput {

    @Field(() => String)
    title!: string;

    @Field(() => String)
    text!: string;
}

@InputType()
export class PaginationInput {

    @Field(() => Int)
    limit!: number;

    @Field(() => Int)
    skip!: number;
}