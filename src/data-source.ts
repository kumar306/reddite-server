import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export const ORMConfig = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "reddite-db",
    synchronize: true, //to make sure orm driver always synced with db at all times
    logging: true,
    entities: [Post, User],
    subscribers: [],
    migrations: [],
})