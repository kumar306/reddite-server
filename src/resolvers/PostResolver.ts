import { myContext } from "../context";
import { Post } from "../entities/Post";
import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { ORMConfig } from "../data-source";
import { UpdateResult } from "typeorm";
import { PaginationInput, PostInput, PostsOutput } from "../utils/postInput";
import { isAuth } from "../utils/isAuthMiddleware";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";

@Resolver(Post)
export class PostResolver {

    //return a slice of text of post rather than entire text 
    // to reduce network payload when getting page posts
    @FieldResolver(() => String)
    textSlice(@Root() root: Post) {
        return root.text.slice(0,50);
    }

    //GET all posts
    @Query(() => PostsOutput)
    async getAllPosts(
        @Ctx() { req }: myContext,
        @Arg("options") options: PaginationInput
    ):Promise<PostsOutput> {

        let posts:Post[] = await ORMConfig.getRepository(Post)
                        .createQueryBuilder("post")
                        .leftJoinAndSelect("post.author", "author")
                        .orderBy("post.id", "DESC")
                        .take(options.limit+1)
                        .skip(options.skip)
                        .getMany();
   
        // createQueryBuilder param - alias for Entity for which we called getRepository method
        // author - 2nd param - alias
        // 1st param - has to be property name on which relation decorator kept
        // take - for pagination limit 'limit' rows retrieved
        // skip - similar to offset - for pagination

        let hasMore:boolean;
        if(posts.length == options.limit+1) {
            hasMore = true;
            posts = posts.slice(0,options.limit);
        } 
        else hasMore = false;
        return { posts, hasMore }
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

        // should attach post with user by his user id - insert a record into post table
        //then add user - session.userId using relation() of createQueryBuilder using created post id
        const post = (await ORMConfig.createQueryBuilder()
                        .insert()
                        .into(Post)
                        .returning(['title','text','author','points'])
                        .values({...input})
                        .execute()).raw[0];

        await ORMConfig.createQueryBuilder()
                       .relation(Post,"author")
                       .of(post.id)
                       .set(req.session.userId); //update query - connecting user to post by authorId field
        
        post.author = await ORMConfig.createQueryBuilder()
                                     .relation(Post,"author")
                                     .of(post.id)
                                     .loadOne();
          
        console.log(post);

        return post;
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

    @FieldResolver(() => Int, {nullable: true})
    async voteStatus(
        @Root() post: Post,
        @Ctx() { req }: myContext,
    ): Promise<number | null> {

        // search for a existing vote - if present, return the value of the vote as voteStatus field
        const existingVote = await ORMConfig.getRepository(Vote).createQueryBuilder("vote")
                                   .where("vote.post = :postId and vote.user = :userId", {postId: post.id, userId: req.session.userId})
                                   .getOne();
        
        // execute() simply returns an object with created fields on the spot, not actual vote entity
        // getOne() will return actual entity object
        if(existingVote == null) 
            return null;
        else 
            return existingVote.vote;
    }

}