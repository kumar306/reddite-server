import { Post } from "../entities/Post";
import { InputType, Field, Int, ObjectType } from "type-graphql";

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

@ObjectType()
export class PostsOutput {
    
    @Field(() => [Post])
    posts?: Post[];

    @Field(() => Boolean)
    hasMore: boolean;
}