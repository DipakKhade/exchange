import { Router ,Request, Response} from "express";
import { RedisManger } from "../lib/Redismanager";
import { GET_DEPTH } from "../lib/types";

export const depthRouter=Router();

//api/v1/order/depth

depthRouter.get('/',function(req:Request,res:Response){
    const {symbol}= req.query

   const r= RedisManger.getInstance().sendAndAwait({
        type:GET_DEPTH,
        data:{
            market: symbol as string
        }
    })
//@ts-ignore
    res.json(r.payload);

})