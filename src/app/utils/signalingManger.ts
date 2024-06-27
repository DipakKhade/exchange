import { Ticker } from "./types";

export class SignalingManger {
  private ws: WebSocket;
  private static instance: SignalingManger;
  private buffreedMessages: any[] = [];
  private isInitilized: boolean = false;
  private callbacks: { [type: string]: any[] } = {};
  private id: number;

  private constructor() {
    this.ws = new WebSocket(BASE_WS_URL);
    this.id = 1;
    this.init();
  }

  init() {
    this.ws.onopen = () => {
      this.isInitilized = true;
      //sending all messges to ws which user send before ws connection happens
      this.buffreedMessages.forEach((msg) => {
        this.ws.send(JSON.stringify(msg));
      });

      this.buffreedMessages = [];
    };

    this.ws.onmessage = (event) => {
      // console.log('ws is opned',event)
      const message = JSON.parse(event.data);
      const type = message.data.e;

      if (this.callbacks[type]) {
        this.callbacks[type].forEach(({ callback }) => {
          if (type === "ticker") {
            callback(message.data.data);
            const newTicker: Partial<Ticker> = {
              lastPrice: message.data.c,
              high: message.data.h,
              low: message.data.l,
              volume: message.data.v,
              quoteVolume: message.data.V,
              symbol: message.data.s,
            };
            // console.log(newTicker);
            callback(newTicker);
          }
        });
      }
    };
  }

  public static getInstance() {
    if (!SignalingManger.instance) {
      return (SignalingManger.instance = new SignalingManger());
    }
    return SignalingManger.instance;
  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
      id: this.id++,
    };
    if (!this.isInitilized) {
      this.buffreedMessages.push(messageToSend);
      return;
    }
    this.ws.send(JSON.stringify(messageToSend));
  }

  async registerCallback(type: string, callback: any, id: string) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });

    console.log(this.callbacks);
  }

  async deRegisterCallback(type: string, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback) => callback.id === id,
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}

// export const BASE_WS_URL = "wss://ws.backpack.exchange";
export const BASE_WS_URL = "wss://ws.backpack.exchange";

// "{\"data\":{\"E\":1719243681485160,\"V\":\"4993244.5039\",\"c\":\"127.04\",\"e\":\"ticker\",\"h\":\"132.42\",\"l\":\"121.77\",\"n\":21733,\"o\":\"132.07\",\"s\":\"SOL_USDC\",\"v\":\"39439.73\"},\"stream\":\"ticker.SOL_USDC\"}"
