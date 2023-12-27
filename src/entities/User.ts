import { BeforeUpdate, Entity, PrimaryKey, Property } from "@mikro-orm/core";
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

    @Property({ type: 'text', unique: true})
    @Field(() => String)
    email!: string;

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

    @Property()
    @Field(() => String)
    updatedAt: Date = new Date();

    @BeforeUpdate()
    beforeUpdate() {
        // Check if there's a hook modifying updatedAt
        console.log('Before Update Hook');
        console.log('password: '+this.password);
        console.log('Updated at: '+this.updatedAt);
    }
}
