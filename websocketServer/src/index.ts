
import WebSocket, { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";

const ws=new WebSocketServer({port:3001});

ws.on("connection",(socket)=>{
    UserManager.getInstance().adduser(socket)
});



