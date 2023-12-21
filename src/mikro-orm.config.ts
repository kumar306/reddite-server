import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Options } from "@mikro-orm/core";
import { User } from "./entities/User";

const config: Options = {
    dbName: 'reddite-db',
    type: 'postgresql',
    entities: [Post, User],
    user: 'postgres',
    password: 'password',
    debug: !__prod__
};

export default config;