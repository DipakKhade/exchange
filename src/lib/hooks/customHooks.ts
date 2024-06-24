import { useEffect, useState } from "react";
import { Ticker } from "../../app/utils/types";
import axios from 'axios';
import { promises } from "dns";
import { SignalingManger } from "@/app/utils/signalingManger";

export function useGetTicker(){
    const [tickers,setTickers]=useState<Ticker[]>([])
    const [ticker,setTicker]=useState<Ticker>()



    useEffect(()=>{
        (async()=>{
            try{
                const response=await axios.get<Ticker[]>(`https://exchange-proxy.100xdevs.com/api/v1/tickers`)
                const tickerData=response.data

                // const ct=tickerData.filter(function(t){
                //     return t.symbol==currentTicker
                // })
                setTickers(tickerData)
                

                // console.log(ticker)

            }
            catch(e){
            }
    
        })();

       
    },[])
   

    return {tickers }

}


