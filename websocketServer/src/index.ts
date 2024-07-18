
import { WebSocketServer,WebSocket } from "ws";
import { UserManager } from "./UserManager";

const ws =new WebSocketServer({
    port:3001
});

ws.on("connection",(socket:WebSocket)=>{
    UserManager.getInstance().adduser(socket)
});

