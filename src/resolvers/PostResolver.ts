import { myContext } from "../context";
import { Post } from "../entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { ORMConfig } from "../data-source";

@Resolver()
export class PostResolver {

    //GET all posts
    @Query(() => [Post])
    getAllPosts():Promise<Post[]> {
        return ORMConfig.manager.find(Post, {});
    }

    //get a specific post
    @Query(() => Post, { nullable: true})
    getPost(@Arg("id") id:number):Promise<Post | null> {
        return ORMConfig.manager.findOne(Post, {where: {id}});
    }
    
    //create post
    @Mutation(() => Post)
    async createPost(@Arg("title") title: string):Promise<Post> {
        return ORMConfig.manager.create(Post, {title}).save();
    }

    //update post - update by id, change title field
    @Mutation(() => Post, { nullable: true})
    async updatePost(
    @Arg("id") id:number, 
    @Arg("title") title: string): Promise<Post | null> {
        //check if post is there
        const post = await ORMConfig.manager.findOne(Post, {where: {id}});
        if(!post) return null;
        
        // update using active record method
        // --------------------------------
        // post.title = title;
        // return post.save();

        // update using query builder of typeORM 
        // --------------------------------
        await ORMConfig.createQueryBuilder().update(Post).set({title}).where("id = :id", {id}).execute();
        // returns Promise<UpdateResult>

        return post;
    }

    //delete post
    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id:number,
    ): Promise<Boolean> {
        try {
            // await ORMConfig.manager.delete(Post, {id});  -- active record method of typeORM
            await ORMConfig.createQueryBuilder().delete().from(Post).where("id = :id", {id}).execute();
        }
        catch { return false; }
        return true;
    }

}