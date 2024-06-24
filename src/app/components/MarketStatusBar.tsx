'use client';
import { useGetTicker } from "@/lib/hooks/customHooks"
import { useEffect, useState } from "react";
import Image from "next/image";
import sol_logo from '../../../lib/icons_images/sol_usdc.png'
import { Ticker } from "@/app/utils/types";
import { SignalingManger } from "@/app/utils/signalingManger";


export default  function MarketStatusBar({market}:{market:string}){
  const [currentTicker,setCurrentTicker]=useState<Ticker|null>(null)
    const ticker=useGetTicker()

    useEffect(() => {
      const ct = ticker.tickers.find(t => t.symbol === market);
      if (ct) {
        setCurrentTicker(ct);
      }


      SignalingManger.getInstance().registerCallback("ticker",(data:Partial<Ticker>)=>setCurrentTicker(prevTicker=>({
        firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? '',
        high: data?.high ?? prevTicker?.high ?? '',
        lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? '',
        low: data?.low ?? prevTicker?.low ?? '',
        priceChange: data?.priceChange ?? prevTicker?.priceChange ?? '',
        priceChangePercent: data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? '',
        quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? '',
        symbol: data?.symbol ?? prevTicker?.symbol ?? '',
        trades: data?.trades ?? prevTicker?.trades ?? '',
        volume: data?.volume ?? prevTicker?.volume ?? '',
      })),market)
      SignalingManger.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`ticker.${market}`]}	);
 
      return()=>{
        SignalingManger.getInstance().deRegisterCallback("ticker",market)
        SignalingManger.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`ticker.${market}`]}	)
      }


    }, [market]);


    return <>

<main>
{
  currentTicker &&  <div className="flex items-center justify-between flex-row no-scrollbar overflow-auto pr-4 border border-[#202127]">
  <div className="flex h-[60px] shrink-0 space-x-4">
    <button type="button" className="react-aria-Button" data-rac="">
      <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-panel-left-open mr-2 h-6 w-6 text-baseIcon"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M9 3v18"></path>
          <path d="m14 9 3 3-3 3"></path>
        </svg>
        <div className="flex flex-row mr-2">
          <div className="flex items-center flex-row gap-2">
            <div className="flex flex-row relative">
              <Image
                alt="SOL Logo"
                loading="lazy"
                width="24"
                height="24"
                decoding="async"
                className="z-10 rounded-full shadow-[0_0_0_1px_inset] shadow-baseBackgroundL1 outline outline-2 outline-baseBackgroundL1"
               src={sol_logo}
              />
              {/* <Image
                alt="USDC Logo"
                loading="lazy"
                width="24"
                height="24"
                decoding="async"
                className="-ml-2 rounded-full"
                src="/coins/usdc.png"
              /> */}
            </div>
            <p className="font-medium text-baseTextHighEmphasis">{currentTicker.symbol.split('_')[0]}/{currentTicker.symbol.split('_')[1]}</p>
          </div>
        </div>
      </div>
    </button>
    <div className="flex items-center flex-row space-x-8">
      <div className="flex flex-col h-full justify-center">
        <p className="font-medium tabular-nums text-redText text-lg text-green-500">{currentTicker.firstPrice}</p>
        <p className="font-medium text-baseTextHighEmphasis text-sm tabular-nums">${currentTicker.lastPrice}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-xs leading-3 text-baseTextMedEmphasis">24H Change</p>
        <p className={`mt-1 text-sm font-medium tabular-nums leading-5 text-baseTextHighEmphasis text-redText 
            
            ${ currentTicker.priceChange.startsWith('-') ? 'text-red-500' :'text-green-400'}

            `}>{currentTicker.priceChange} {currentTicker.priceChangePercent}%</p>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-xs leading-3 text-baseTextMedEmphasis">24H High</p>
        <p className="mt-1 text-sm font-medium tabular-nums leading-5 text-baseTextHighEmphasis">{currentTicker.high}</p>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-xs leading-3 text-baseTextMedEmphasis">24H Low</p>
        <p className="mt-1 text-sm font-medium tabular-nums leading-5 text-baseTextHighEmphasis">{currentTicker.low}</p>
      </div>
      <button
        type="button"
        className="font-medium transition-opacity hover:opacity-80 hover:cursor-pointer text-accentBlue text-base text-left"
        data-rac=""
      >
        <div className="flex flex-col">
          <p className="font-medium text-xs leading-3 text-baseTextMedEmphasis">24H Volume ({currentTicker.symbol.split('_')[1]})</p>
          <p className="mt-1 text-sm font-medium tabular-nums leading-5 text-baseTextHighEmphasis">{currentTicker.volume}</p>
        </div>
      </button>
    </div>
  </div>
</div>
}
 
</main>




    </>
} 



// {"data":{"E":1719218792791850,"V":"3220782.9744","c":"126.39","e":"ticker","h":"134.76","l":"123.18","n":18833,"o":"134.49","s":"SOL_USDC","v":"25203.27"},"stream":"ticker.SOL_USDC"}	