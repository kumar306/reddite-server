import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id!: number;

    @Column()
    @Field(() => String)
    title: string;

    @Column()
    @Field(() => String)
    text: string;

    @ManyToOne(() => User, (user) => user.posts)
    @Field(() => User)
    author: number;

    @Column({ default: 0 })
    @Field(() => Int)
    points: number;

    @CreateDateColumn()
    @Field(() => String)
    createdAt: Date;

    @UpdateDateColumn()
    @Field(() => String)
    updatedAt: Date;
}

//post entity which is the main crucial table