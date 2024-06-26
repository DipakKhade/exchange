"use client";
import {  useEffect, useState } from "react";
import MarketStatusBar from "@/app/components/MarketStatusBar";
import { Ticker } from "@/app/utils/types";
import Chart from "@/app/components/chart";
import { ChartHeaderBar } from "@/app/components/chart";
export default function Page({ params }: { params: { market: string } }) {
  const [currentTicker, setCurrentTicker] = useState<Ticker | null>(null);



  return (
    <>
      <main>
        {params.market && <MarketStatusBar market={params.market as string} />}

        <div className="flex flex-row h-[620px]">

          <div className="w-[210vw] border border-[#202127]">
            <div>

<ChartHeaderBar/>
            </div>
            <Chart/>

          </div>
          <div className="border border-[#202127]"></div>
          <div className="border border-[#202127]"></div>

        </div>
      </main>
    </>
  );
}

// {"data":{"E":1719218792791850,"V":"3220782.9744","c":"126.39","e":"ticker","h":"134.76","l":"123.18","n":18833,"o":"134.49","s":"SOL_USDC","v":"25203.27"},"stream":"ticker.SOL_USDC"}
