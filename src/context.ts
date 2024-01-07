import { RedisClientType } from "@redis/client";
import { Request, Response } from "express";
import { voteLoader } from "./utils/createVoteLoader";

interface CustomRequestProperties {
    session: { userId: number }
}

export type myContext = {
    req: Request & CustomRequestProperties,
    res: Response,
    redis: RedisClientType,
    voteLoader: ReturnType<typeof voteLoader>
};