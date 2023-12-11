import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

    @PrimaryKey()
    id: number;

    @Property({ type: 'text' })
    title: string;

    @Property({ defaultRaw: 'now' })
    createdAt!: Date;

    @Property({ onUpdate: () => { new Date() }, defaultRaw: 'now' })
    updatedAt!: Date;
}

//post entity which is the main crucial table