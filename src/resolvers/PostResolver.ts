import { myContext } from "../context";
import { Post } from "../entities/Post";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { ORMConfig } from "../data-source";
import { UpdateResult } from "typeorm";
import { PostInput } from "../utils/postInput";
import { isAuth } from "../utils/isAuthMiddleware";

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
    @UseMiddleware(isAuth) //middleware to check if user is auth before executing the resolver fn
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { req }: myContext
        ):Promise<Post> {

        // should attach post with user by his user id
        const response = await ORMConfig.createQueryBuilder()
                        .insert()
                        .into(Post)
                        .returning(['title','text','author'])
                        .values({
                            ...input, 
                            author: req.session.userId})
                        .execute();    
            
        return response.raw[0] as Post;
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
        // return post.save(); // returns Promise<Post>

        // update using query builder of typeORM 
        // --------------------------------
        const response = await ORMConfig.createQueryBuilder()
                                .update(Post)
                                .set({title})
                                .where("id = :id", {id})
                                .returning(['id','title','text','author'])
                                .execute();
        return response.raw[0] as Post;
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