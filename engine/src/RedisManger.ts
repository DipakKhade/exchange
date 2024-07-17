import { createClient, RedisClientType } from "redis";
import { ORDER_UPDATE, TRADE_ADDED } from "./types";


type DbMessage = {
    type: typeof TRADE_ADDED,
    data: {
        id: string,
        isBuyerMaker: boolean,
        price: string,
        quantity: string,
        quoteQuantity: string,
        timestamp: number,
        market: string
    }
} | {
    type: typeof ORDER_UPDATE,
    data: {
        orderId: string,
        executedQty: number,
        market?: string,
        price?: string,
        quantity?: string,
        side?: "buy" | "sell",
    }
}



export class RedisManger{
    private static instance :RedisManger;
    private client: RedisClientType;

    private constructor(){
        this.client=createClient()
        this.client.connect()
    }

    private static getInstance(){
        if(! this.instance){
            this.instance= new RedisManger()
        }
        return this.instance
    }

    public pushMessage(message: DbMessage) {
        this.client.lPush("db_processor", JSON.stringify(message));
    }

    public publishMessage(channel: string, message: any) {
        this.client.publish(channel, JSON.stringify(message));
    }

    public sendToApi(clientId: string, message: any) {
        this.client.publish(clientId, JSON.stringify(message));
    }



}