import { myContext } from "../context";
import { Post } from "../entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateRequestContext, FilterQuery, UseRequestContext } from "@mikro-orm/core";


@Resolver()
export class PostResolver {

    //GET all posts
    @Query(() => [Post])
    getAllPosts(@Ctx() { em }: myContext):Promise<Post[]> {
        return em.fork().find(Post, {});
    }

    //get a specific post
    @Query(() => Post)
    getPost(@Arg("id") id:number, @Ctx() { em }:myContext):Promise<Post | null> {
        return em.fork().findOne(Post, { id });
    }
    
    //create post
    @Mutation(() => Post)
    async createPost(@Arg("title") title: string, @Ctx() { em }:myContext):Promise<Post> {
        const emFork = em.fork(); 
        const post = emFork.create(Post, { title });
        await emFork.persistAndFlush(post);
        return post;
    }

    //update post - update by id, change title field
    @Mutation(() => Post)
    async updatePost(
    @Arg("id") id:number, 
    @Arg("title") title: string,
    @Ctx() { em }:myContext): Promise<Post | null> {
        //check if post is there
        const emFork = em.fork(); 
        const post = await emFork.findOne(Post, {id});
        if(!post) return null;
        post.title = title;
        await emFork.persistAndFlush(post);
        return post;
    }

    //delete post
    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id:number,
        @Ctx() { em }:myContext
    ): Promise<Boolean> {
        try {
            await em.fork().nativeDelete(Post, {id});
        }
        catch { return false; }
        return true;
    }

}