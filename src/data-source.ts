import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from "path";
export const ORMConfig = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "reddite-db",
    synchronize: true, //to make sure orm driver always synced with db at all times - disable in prod
    logging: true,
    entities: [Post, User],
    subscribers: [],
    migrations: [
        path.join(__dirname,"migrations","1703997944384-dataInsert.ts")
    ],
})