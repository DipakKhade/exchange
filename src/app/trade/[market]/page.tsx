'use client';
import { useGetTicker } from "@/lib/hooks/customHooks"
import { useEffect, useState } from "react";
import Image from "next/image";
import sol_logo from '../../../lib/icons_images/sol_usdc.png'
import MarketStatusBar from "@/app/components/MarketStatusBar";
import { Ticker } from "@/app/utils/types";
import { SignalingManger } from "@/app/utils/signalingManger";


export default  function Page({ params }: { params: { market: string } }){
  const [currentTicker,setCurrentTicker]=useState<Ticker|null>(null)



    return <>

<main>

{params.market && <MarketStatusBar market={params.market as string} />}
 
</main>




    </>
} 



// {"data":{"E":1719218792791850,"V":"3220782.9744","c":"126.39","e":"ticker","h":"134.76","l":"123.18","n":18833,"o":"134.49","s":"SOL_USDC","v":"25203.27"},"stream":"ticker.SOL_USDC"}	