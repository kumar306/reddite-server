import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {

    @PrimaryKey()
    @Field(() => Int)
    id!: number;

    @Property({ type: 'text', unique: true })
    @Field(() => String)
    username!: string;

    @Property({ type: 'text' })
    password!: string;

    @Property({ type: 'text' })
    @Field(() => String)
    fname!: string;

    @Property({ type: 'text' })
    @Field(() => String)
    lname!: string;

    @Property()
    @Field(() => String)
    createdAt: Date = new Date();

    @Property({ onUpdate: () => { new Date() }})
    @Field(() => String)
    updatedAt: Date = new Date();
}

//post entity which is the main crucial table