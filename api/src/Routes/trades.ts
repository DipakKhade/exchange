
import { Router} from 'express';

export const tradesRouter=Router();

tradesRouter.get('/',(req,res)=>{
    res.json({
        trades:"trades"
    })
})

