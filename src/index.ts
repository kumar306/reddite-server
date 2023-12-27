import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { createClient } from "redis";
import session from "express-session";
import RedisStore from "connect-redis";
import { User } from "./entities/User";
import { sendMail } from "./utils/sendEmail";
import path from 'path';
import 'dotenv/config';

const main = async() => {
    //db init
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

     //express server init
     const app = express();

     // init redis client and store
     let redisClient = createClient();
     redisClient.connect().catch(console.error);
     let redisStore = new RedisStore({
        client: redisClient,
        prefix: "reddite-server:", //with this prefix it is stored in redis
      })

     
    // ------------- FOR ACCESSING VIA SANDBOX PROXY ------------------------
     //  app.set('trust proxy', !__prod__); 
     // for graphql v4 - https://apollosandbox is proxy by which gql works 
     // SANDBOX PROXY (client) -> http//localhost:4000/graphql (apollo server)
     // set x-forwarded-proto to https on sandbox so apollo server sets cookie to sandbox, changes propagated to client
     // works

     app.use(session({
        store: redisStore,
        name: 'reddite-server-cookie', // name of cookie which will contain encrypted prefix+session id
        secret: 'pvnixmalfuen23vjwe', //this is used to sign cookie sent in response and to unsign in request. it will be signing value read from 'cookie-id' property
        cookie: {
            httpOnly: true,
            sameSite: "lax", // if sending from sandbox (diff URL), set sameSite as "none" else set to "lax"
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years is expiry
            secure: false //secure: false for localhost 3000 to localhost 4000 (same site, http connection)
            // secure: true, //secure:true to set cookie on https sandbox proxy -gql v4
        },
        saveUninitialized: false,
        resave: false
     }))

    //apollo server init - provide schema to the server by providing resolvers using buildSchema
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false,
        }),
        context: ({req, res}) => ({ em: orm.em, redis:redisClient, req, res }),
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({ 
        app,
        cors: { credentials: true, origin: ["https://studio.apollographql.com", "http://localhost:3000"] },
        // setting cors headers - this is required to send cookies back to sandbox proxy, localhost
    });

    app.listen(4000, () => {
        console.log("Server started in port 4000...");
    })
}

main().catch(err => {
    console.log(err);
});