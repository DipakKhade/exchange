import { createClient ,RedisClientType } from "redis";

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

    public sendAndAwait(){

    }

    generateRandomId(){
        
    }


}