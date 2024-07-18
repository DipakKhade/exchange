import { WebSocket } from "ws";
import { SUBSCRIBE,UNSUBSCRIBE } from "./types/in";
export class User{
    private id:string;
    private ws:WebSocket;
    private Subscriptions:string[]=[];

    constructor(id:string,ws:WebSocket){
        this.id=id
        this.ws=ws
    }

    public subscribe(subscription:string){
        this.Subscriptions.push(subscription)
    }

    public unsubscribe(subscribtion:string){
        this.Subscriptions.filter(s=>s!==subscribtion)
    }

    emit(message:string){
        this.ws.send(JSON.stringify(message))
    }

    private addlistners(){
        this.ws.on('message',(incomingMessage:string)=>{
            if(JSON.parse(incomingMessage).method==SUBSCRIBE){
                //subscriptionManager method
                JSON.parse(incomingMessage).params.forEach(function(s:string){

                })

            }else if(JSON.parse(incomingMessage).method==UNSUBSCRIBE){
                JSON.parse(incomingMessage).params.forEach(function(s:string){

                })


            }

        })
    }
}