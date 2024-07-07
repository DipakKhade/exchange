
import {Router} from 'express';
import { CREATE_ORDER, CANCEL_ORDER, GET_OPEN_ORDERS } from '../lib/types';
import { RedisManger } from '../lib/Redismanager';

export const OrderRouter=Router();

OrderRouter.get('/',async (req,res)=>{
    const {market, price, quantity, side, userId} =req.body
    console.log("place order==>",{market, price, quantity, side, userId})

    await RedisManger.getInstance().sendAndAwait({
        type:CREATE_ORDER,
        data:{
            market, price, quantity, side, userId
        }
    })
    
})


OrderRouter.delete('/',async(req,res)=>{
    const {orderId, market} =req.body
    console.log("delete_order ==>",{orderId, market})

    await RedisManger.getInstance().sendAndAwait({
        type:CANCEL_ORDER,
        data:{orderId, market}

    })

})

OrderRouter.get('/open',async(req,res)=>{
    //passing a userid and market in query
    const {userId , market} =req.query

    await RedisManger.getInstance().sendAndAwait({
        type:GET_OPEN_ORDERS,
        data:{
           userId: userId as String,
           market : market as string

        }
    })
})