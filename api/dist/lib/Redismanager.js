"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManger = void 0;
const redis_1 = require("redis");
class RedisManger {
    constructor() {
        this.client = (0, redis_1.createClient)();
        this.client.connect();
        this.publisher = (0, redis_1.createClient)();
        this.publisher.connect();
    }
    static getInstance() {
        if (!this.instance) {
            return this.instance = new RedisManger();
        }
        return this.instance;
    }
    sendAndAwait(message) {
        return new Promise(resolve => {
            const id = this.generateRandomId();
            this.client.subscribe(id, (message) => {
                this.client.unsubscribe(id);
                resolve(JSON.parse(message));
                this.publisher.lPush("message", JSON.stringify({
                    clientId: id,
                    message
                }));
            });
        });
    }
    generateRandomId() {
        return (Math.random() * 1000).toString();
    }
}
exports.RedisManger = RedisManger;
