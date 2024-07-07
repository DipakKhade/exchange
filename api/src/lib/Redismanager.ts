import { createClient ,RedisClientType } from "redis";
import { MessageFromOrderBook } from "./types";

export class RedisManger{

    private client : RedisClientType;
    private publisher:RedisClientType;
    private static instance:RedisManger;

    private constructor(){
        this.client=createClient();
        this.client.connect();
        this.publisher=createClient();
        this.publisher.connect();
    }

    public static getInstance(){
        if(!this.instance){
            return this.instance=new RedisManger();
        }

        return this.instance;
    }

    public sendAndAwait(message:any){
        return new Promise<MessageFromOrderBook>(resolve=>{
            const id=this.generateRandomId();
            this.client.subscribe(id,(message)=>{
                this.client.unsubscribe(id);
                resolve(JSON.parse(message))

                this.publisher.lPush("message",JSON.stringify({
                    clientId:id,
                    message
                }))
    
            })

          
        })
    }

    generateRandomId(){
        return (Math.random()*1000).toString()
    }


}