import { ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
@Unique(["user","post"])
export class Vote {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    vote: number

    @ManyToOne(() => User, (user) => user.votes)
    user: User

    @ManyToOne(() => Post, (post) => post.votes)
    post: Post

}