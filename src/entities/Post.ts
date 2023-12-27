import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {

    @PrimaryKey()
    @Field(() => Int)
    id!: number;

    @Property({ type: 'text' })
    @Field(() => String)
    title: string;

    @Property()
    @Field(() => String)
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    @Field(() => String)
    updatedAt: Date = new Date();
}

//post entity which is the main crucial table