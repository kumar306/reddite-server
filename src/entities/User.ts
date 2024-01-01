
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Vote } from "./Vote";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id!: number;

    @Column({ unique: true })
    @Field(() => String)
    username!: string;

    @Column({ unique: true})
    @Field(() => String)
    email!: string;

    @Column({ type: 'text' })
    password!: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @Column({ type: 'text' })
    @Field(() => String)
    fname!: string;

    @Column({ type: 'text' })
    @Field(() => String)
    lname!: string;

    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[];

    @CreateDateColumn()
    @Field(() => String)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => String)
    updatedAt: Date;

}
