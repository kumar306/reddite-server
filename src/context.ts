import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";

interface CustomRequestProperties {
    session: { userId: number }
}

export type myContext = {
    em: EntityManager<IDatabaseDriver<Connection>>,
    req: Request & CustomRequestProperties,
    res: Response
};