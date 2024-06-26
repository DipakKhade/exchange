
'use client';
import axios from "axios"
import { Depth } from "../utils/types"
import { useEffect, useState } from "react";


export default function OrderBook({symbol}:{symbol:string}){

    return<>
    <div className="flex flex-col w-[300px] overflow-hidden">
        <div className="flex flex-col h-full">
            <div className="px-3">
                <div className="flex flex-row flex-0 gap-5 undefined">
                    <div className="flex flex-col cursor-pointer justify-center py-2">
                        <p className="text-sm font-medium py-1 border-b-2 border-accentBlue text-baseTextHighEmphasis">Book</p>

                    </div>

                    <div className="flex flex-col cursor-pointer justify-center py-2">
                        <p className="text-sm font-medium py-1 border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis">Treads</p>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div className="flex flex-col grow overflow-y-hidden">
        <div className="flex flex-col h-full grow overflow-x-hidden">

        </div>

        <div className="flex items-center justify-between flex-row px-3">
            <div className="flex items-center flex-row">
            <button type="button"  className="rounded-2xl text-baseIcon transition hover:bg-baseBackgroundL2 hover:text-white p-1 !rounded-md bg-transparent" data-rac="" data-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14"></path></svg></button>
            </div>

            <p className="font-medium text-baseTextHighEmphasis mx-0.5 select-none text-center text-xs w-[4inch]" ></p>
            <button className="rounded-2xl text-baseIcon transition hover:bg-baseBackgroundL2 hover:text-white p-1 !rounded-md bg-baseBackgroundL2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
            </button>
        </div>

        <SymbolDepth symbol={symbol as string} />

    </div>
    </>
}



async function getDepth(symbol:string):Promise<any>{

   const res= await axios.get<Depth>(`https://exchange-proxy.100xdevs.com/api/v1/depth?symbol=${symbol}`)

   return res.data

}


export function SymbolDepth({symbol}:{symbol:string}){
const [depthData, setDepthData]=useState<Depth>()
    useEffect(function(){
(async()=>{
    const data=await getDepth(symbol)
        console.log(data)
})();
    

    },[])
  
    return<>
     <div>
            {/* Render depth data */}
            <h3>Depth Data for {symbol}</h3>
        </div>
    </>

}





const BLUR_USDC={
    "asks": [
    [
    "0.2385",
    "1258.31"
    ],
    [
    "0.2386",
    "4192.72"
    ],
    [
    "0.2387",
    "12571.20"
    ],
    [
    "0.2407",
    "41565.84"
    ],
    [
    "0.6977",
    "430.05"
    ],
    [
    "1.1930",
    "80.49"
    ],
    [
    "3.2400",
    "104.00"
    ],
    [
    "5.2491",
    "110.00"
    ],
    [
    "13.0612",
    "101.00"
    ],
    [
    "51.2496",
    "13.41"
    ],
    [
    "82.2496",
    "13.42"
    ],
    [
    "300.0000",
    "1.00"
    ]
    ],
    "bids": [
    [
    "0.0100",
    "100.00"
    ],
    [
    "0.0113",
    "2742.08"
    ],
    [
    "0.0271",
    "19448.94"
    ],
    [
    "0.1278",
    "445.70"
    ],
    [
    "0.1900",
    "50.00"
    ],
    [
    "0.2023",
    "2431.11"
    ],
    [
    "0.2360",
    "42376.59"
    ],
    [
    "0.2381",
    "12600.73"
    ],
    [
    "0.2382",
    "4198.38"
    ],
    [
    "0.2383",
    "1259.03"
    ]
    ],
    "lastUpdateId": "7827734"
    }