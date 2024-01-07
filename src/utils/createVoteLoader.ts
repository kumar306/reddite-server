// create a dataLoader to fetch the voteStatuses given postId, userId  
import DataLoader from "dataloader"
import { ORMConfig } from "../data-source";
import { Vote } from "../entities/Vote";


export const voteLoader = () => (

    new DataLoader<{postId: number, userId: number}, Vote>(async (args) => {

        // one graphql request to fetch 10 posts per page - each post does a query to fetch its votestatus - 11 queries per page
        // dataloader is created once per request
        // when getPosts query triggers voteStatus field resolver and it loads from dataloader
        // so all the loaded postIds get accumulated into a batch in this fn and 1 single query runs - totally 2 queries per page

        const postIds = args.map(key => key.postId);
        const userId = args[0].userId;

        const votes: (Vote | null)[] = await ORMConfig.getRepository(Vote)
                                     .createQueryBuilder("vote")
                                     .where("vote.post in (:...postIds) and vote.user = :userId", 
                                     {postIds, userId})
                                     .orderBy("id", "DESC")
                                     .getMany();
        
        for ( let i = votes.length; i<postIds.length; i+=1) {
            let dummyVote = new Vote();
            dummyVote.id = -1;
            votes.push(dummyVote);
        }

        const voteIdToVoteStatus: Record<number, Vote> = {};

        votes.forEach((vote) => {
            voteIdToVoteStatus[vote.id] = vote;
        });

        const sortedDescVotes = votes.map((vote) => voteIdToVoteStatus[vote.id]);
        return sortedDescVotes;
    })
)