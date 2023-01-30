import { io } from "./socket.js";

export class sendData {
    static connected= false;
    constructor(boolean){
        sendData.connected = boolean;
    }
}