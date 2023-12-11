import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";

const main = async() => {
    //db init
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

     //express server init
     const app = express();

    //apollo server init - provide schema to the server by providing resolvers using buildSchema
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    })
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("Server started in port 4000...");
    })
}

main().catch(err => {
    console.log(err);
});