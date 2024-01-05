import { ORMConfig } from "../data-source";
import { myContext } from "../context";
import { Vote } from "../entities/Vote";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { Post } from "../entities/Post";
import { isAuth } from "../utils/isAuthMiddleware";
import { User } from "../entities/User";

@InputType()
export class VoteInput {

    @Field(() => Int)
    postId: number;

    @Field(() => Int)
    vote: number;
}

@Resolver(Vote)
export class VoteResolver {

    @Mutation(() => Post, { nullable: true})
    @UseMiddleware(isAuth) 
    async vote(
        @Arg('input') input: VoteInput, 
        @Ctx() {req}: myContext
    ) {

        // search for userId, postID combo
            // if not there -> vote for first time -> add to vote table and update the points (normal increment/decrement)
            // if there -> means i am voting on the post again
            // value -> +1 or -1
            // if value is same as my input value -> do nothing
            // if value is different as input value 
                // increment/decrement post points
                // edge case: if post points turns 0 after increment/decrement, do it again

        const existingVote:Vote = await ORMConfig.getRepository(Vote).createQueryBuilder("vote")
                                     .where("vote.postId = :postId and vote.userId = :userId",
                                     {postId: input.postId, userId: req.session.userId}).getOne();
        
        
        if(existingVote == null) {
            await ORMConfig.transaction(async (transactionalEntityManager) => {
                const initVoteInsert:Vote = (await transactionalEntityManager.createQueryBuilder()
                                          .insert()
                                          .into(Vote)
                                          .values({
                                            vote: input.vote
                                          })
                                          .returning(['vote'])
                                          .execute()).raw[0];
    
                await transactionalEntityManager.createQueryBuilder()
                               .relation(Vote,"user")
                               .of(initVoteInsert.id)
                               .set(req.session.userId);
    
                await transactionalEntityManager.createQueryBuilder()
                                .relation(Vote,"post")
                                .of(initVoteInsert.id)
                                .set(input.postId);
    
                // update the post points
                
                if(input.vote == 1)
                    await transactionalEntityManager.createQueryBuilder().update(Post).set({
                        points: () => "points+1"
                    }).where("id = :postId", {postId:input.postId}).execute();   
                else 
                    await transactionalEntityManager.createQueryBuilder().update(Post).set({
                        points: () => "points-1"
                    }).where("id = :postId", {postId:input.postId}).execute();  
         
            })
        
            const updatedPost = await ORMConfig.getRepository(Post)
                                               .createQueryBuilder("post")
                                               .select()
                                               .where("id = :id", {id: input.postId})
                                               .getOne();

            updatedPost.author = await ORMConfig.createQueryBuilder()
                                                .relation(Post, "author")
                                                .of(input.postId)
                                                .loadOne();
            
            return updatedPost;
        }
        else {
            if(existingVote.vote == input.vote) return null;
            else {
                
                await ORMConfig.transaction( async (tm) => {
                    await tm.createQueryBuilder()
                               .update(Vote)
                               .set({ vote: input.vote })
                               .where("id = :id", {id:existingVote.id})
                               .execute();
                
                    const post = await tm.getRepository(Post)
                                         .createQueryBuilder("post")
                                         .where("id = :id", {id: input.postId}).getOne();
                    
                    if(input.vote == 1) {
                        if(post.points == -1) {
                            await tm.createQueryBuilder()
                                    .update(Post)
                                    .set({ points: () => "points+2"})
                                    .where("id = :id", {id: post.id})
                                    .execute();
                        }
                        else {
                            await tm.createQueryBuilder()
                            .update(Post)
                            .set({ points: () => "points+1"})
                            .where("id = :id", {id: post.id})
                            .execute();
                        }
                    }
                    else {
                        if(post.points == 1) {
                            await tm.createQueryBuilder()
                                    .update(Post)
                                    .set({ points: () => "points-2"})
                                    .where("id = :id", {id: post.id})
                                    .execute();
                        }
                        else {
                            await tm.createQueryBuilder()
                                    .update(Post)
                                    .set({ points: () => "points-1"})
                                    .where("id = :id", {id: post.id})
                                    .execute();
                        }
                    }   
                })

                const updatedPost = await ORMConfig.getRepository(Post)
                                               .createQueryBuilder("post")
                                               .select()
                                               .where("id = :id", {id: input.postId})
                                               .getOne();

                updatedPost.author = await ORMConfig.createQueryBuilder()
                                                .relation(Post, "author")
                                                .of(input.postId)
                                                .loadOne();

                return updatedPost;
            }
        }
    }    
}
