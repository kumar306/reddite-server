import { RedisClientType } from "@redis/client";
import { Request, Response } from "express";

interface CustomRequestProperties {
    session: { userId: number }
}

export type myContext = {
    req: Request & CustomRequestProperties,
    res: Response,
    redis: RedisClientType
};