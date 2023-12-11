import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Options } from "@mikro-orm/core";

const config: Options = {
    dbName: 'reddite-db',
    type: 'postgresql',
    entities: [Post],
    user: 'postgres',
    password: 'password',
    debug: !__prod__
};

export default config;