import { myContext } from "../context";
import { MiddlewareFn } from "type-graphql";

export const isAuth:MiddlewareFn<myContext> = ({context}, next) => {
    if(!context.req.session.userId) { 
        throw new Error('user not authenticated');
    }
    
    return next();
}