import { Depth ,Ticker ,KLine} from "./types";
import axios from "axios";

export const BASE_URL = "https://exchange-proxy.100xdevs.com/api/v1";

export async function getMarketDepth(market: string): Promise<Depth> {
  const res = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
  return res.data;
}


export async function getAllTickers():Promise<Ticker[]>{

    const r=await axios.get(`${BASE_URL}/tickers`)

    return r.data

}


export  async function getKlines(symbol:string,interval:string,startTime:number,endTime:number):Promise<KLine>{

    const k=await axios.get( `${BASE_URL}/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`) 
    
    return k.data

}