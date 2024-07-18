import { SubscriptionManager } from "./SubscriptionManager";
import { User } from "./User";
import WebSocket from "ws";

export class UserManager{
    private static instance :UserManager;
    private users:Map<string,User>=new Map()


    private constructor(){}

    public adduser(ws:WebSocket){
        const id:string=(Math.random()).toString()
        const user=new User(id,ws)
        this.users.set(id,user)
        this.registerOnCloseConnection(ws, id);
        return user;
        
    }

    public getUser(id:string){
        return this.users.get(id)
    }


    static getInstance(){
        if(!this.instance){
            this.instance=new UserManager()
            return this.instance
        }
        return this.instance
    }

    private registerOnCloseConnection(ws:WebSocket,id:string){
        ws.on("close",()=>{
            this.users.delete(id)
            SubscriptionManager.getInstance().userLeft(id);
        })
    }

}