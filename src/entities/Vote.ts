import { ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
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