import { ORMConfig } from "../data-source";
import { myContext } from "../context";
import { Vote } from "../entities/Vote";
import { Arg, Ctx, Field, InputType, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
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

@Resolver()
export class VoteResolver {

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async vote(
        @Arg('input') input: VoteInput, 
        @Ctx() {req}: myContext
    ) {
        // postgres transaction when user clicks upvote/downvote
        // add record in vote table (userId, postId, value (1 or -1)) - for upvote, downvote
        // update points for post for postId

        await ORMConfig.transaction(async (transactionalEntityManager) => {
            const initVoteInsert:Vote = (await transactionalEntityManager.createQueryBuilder()
                                      .insert()
                                      .into(Vote)
                                      .values({
                                        vote: input.vote
                                      })
                                      .returning(['vote'])
                                      .execute()).raw[0];
            console.log(initVoteInsert);

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
        
        return true;
    }
}
