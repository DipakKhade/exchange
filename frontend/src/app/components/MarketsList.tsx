"use client";

import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getAllTickers } from "../utils/HttpRequests";
import Link from "next/link";

export default function MarketsList() {

  const[allTickers,setAllTickers]=useState<Ticker[]>()
  
  useEffect(()=>{
    (async()=>{
const t=await getAllTickers()
setAllTickers(t)
    })();
  })

  // console.log(allTickers)
  return (
    <>
      <div className="text-[#969FA1]">
        <MarketListHeader />
        <div className="flex flex-col rounded-lg bg-baseBackgroundL1 py-3 bg-[#14151B] min-w-[700px]">
          <table className="w-full table-auto">
            <thead>

            
              <tr>
                <th className="px-2 py-3 text-left text-sm font-normal  first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal  first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  Price
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal  first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  Market Cap
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal  first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  24h Volumn
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal  first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  24h Change
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal  first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  24 Price
                </th>
              </tr>
            </thead>


            <tbody>
              {
                 allTickers && allTickers.map(function(ticker:Ticker,index:number){
                return<Link key={index}  href={`/trade/${ticker.symbol}`}>
                  <tr >
                  
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
{ticker.symbol}
                  </th>
                  <td className="px-6 py-4">
                      {ticker.lastPrice}
                  </td>
                  <td className="px-6 py-4">
                      market cap
                  </td>
                  <td className="px-6 py-4">
                      volumn
                  </td>
                  <td className="px-6 py-4">
                      change
                  </td>
                  <td className="px-6 py-4">
                      price
                  </td>
              </tr>
                  </Link>
                 })
              }
            
           
        </tbody>


          </table>
        </div>
      </div>
    </>
  );
}

enum ActiveTab {
  All,
  Spot,
  Exprimental,
  Favorites,
}
export function MarketListHeader() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.All);

  function ChangeTab(tab: ActiveTab) {
    setActiveTab(tab);
  }

  return (
    <>
      <div className="flex flex-row mt-8">
        <div className="flex flex-col">
          <div className="mx-auto flex space-x-2">
            <div
              className={`cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90 ${activeTab == ActiveTab.All ? "bg-[#0D1F3A] text-sky-400" : ""}`}
              onClick={() => ChangeTab(ActiveTab.All)}
            >
              All
            </div>
            <div
              className={`cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90 ${activeTab == ActiveTab.Spot ? "bg-[#0D1F3A] text-sky-400" : ""}`}
              onClick={() => ChangeTab(ActiveTab.Spot)}
            >
              Spot
            </div>
            <div
              className={`cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90 ${activeTab == ActiveTab.Exprimental ? "bg-[#0D1F3A] text-sky-400" : ""}`}
              onClick={() => ChangeTab(ActiveTab.Exprimental)}
            >
              Exprimental
            </div>
            <div
              className={`cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90 ${activeTab == ActiveTab.Favorites ? "bg-[#0D1F3A] text-sky-400" : ""}`}
              onClick={() => ChangeTab(ActiveTab.Favorites)}
            >
              Favorites
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
