"use client";
import { Depth, Ticker } from "../utils/types";
import { getDepth, getTicker } from "../utils/getData";
import { useEffect, useState } from "react";
import { reverse } from "dns";
import { SignalingManager } from "../utils/signalingManager";

export default function OrderBook({ symbol }: { symbol: string }) {
  return (
    <>
      <div className="flex flex-col w-[300px] overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="px-3">
            <div className="flex flex-row flex-0 gap-5 undefined">
              <div className="flex flex-col cursor-pointer justify-center py-2">
                <p className="text-sm font-medium py-1 border-b-2 border-accentBlue text-baseTextHighEmphasis">
                  Book
                </p>
              </div>

              <div className="flex flex-col cursor-pointer justify-center py-2">
                <p className="text-sm font-medium py-1 border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis">
                  Treads
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col grow overflow-y-hidden">
        <div className="flex flex-col h-full grow overflow-x-hidden"></div>

        <div className="flex items-center justify-between flex-row px-3">
          <div className="flex items-center flex-row">
            <button
              type="button"
              className="text-baseIcon transition hover:bg-baseBackgroundL2 hover:text-white p-1 !rounded-md bg-transparent"
              data-rac=""
              data-disabled="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-minus"
              >
                <path d="M5 12h14"></path>
              </svg>
            </button>
          </div>

          <p className="font-medium text-baseTextHighEmphasis mx-0.5 select-none text-center text-xs w-[4inch]"></p>
          <button className="text-baseIcon transition hover:bg-baseBackgroundL2 hover:text-white p-1 !rounded-md bg-baseBackgroundL2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
        </div>

        <SymbolDepth symbol={symbol as string} />
      </div>
    </>
  );
}

export function SymbolDepth({ symbol }: { symbol: string }) {
  const [depthData, setDepthData] = useState<Depth>();
  const [tickerPrice,setTickerPrice]=useState<number>(0)

  useEffect(function () {
    (async () => {
    //   const data = await getDepth(symbol);
    //   console.log(data)

    const t=getTicker(symbol as string)
    setTickerPrice(parseFloat((await t).firstPrice))
    
    })();
  }, []);

  // console.log(symbol);

  return (
    <>
      <div>
        {/* Render depth data */}
        {/* <h3>Depth Data for {symbol}</h3> */}

        <div className="items-center flex-row border-b-1 border-b-borderColor flex px-3 py-2 text-baseTextMedEmphasis">
          <p className="font-medium text-baseTextHighEmphasis w-[30%] text-xs">{`Price (${symbol.split("_")[1]})`}</p>
          <p className="font-medium w-[30%] text-right text-xs text-baseTextMedEmphasis">{`Size ((${symbol.split("_")[0]}))`}</p>
          <p className="font-medium w-[40%] text-right text-xs text-baseTextMedEmphasis">{`Total (${symbol.split("_")[0]})`}</p>
        </div>
        <AskTable market={symbol as string} />
        <div>{tickerPrice}</div>
        <BidTable market={symbol as string} />
      </div>
    </>
  );
}

// {"method":"SUBSCRIBE","params":["depth.200ms.BTC_USDC"],"id":3}

function AskTable({ market }: { market: string }) {
  const [ask, setAsk] = useState<[string, string][]>();
  const [cumsumSize,setCumsumSize]=useState<any[]>()

useEffect(()=>{
  (async () => {
  
    SignalingManager.getInstance().registerCallback("depth",(data:any)=>{
      console.log('updated data',data)

      // dout
      setAsk((originalAsk)=>{
        const updatedAsk=[...(originalAsk || [])]

  
        for(let i=0 ; i<updatedAsk.length;i++){
          for(let j=0 ; j<data.bids.length;j++){
            if (updatedAsk[i][0] === data.ask[j][0]) {
              updatedAsk[i][1] = data.ask[j][1];
              if (Number(updatedAsk[i][1]) === 0) {
                  updatedAsk.splice(i, 1);
              }
              break;
          }
        }
      }       
      
      for (let j = 0; j < data.ask.length; j++)  {
        if (Number(data.bids[j][1]) !== 0 && !updatedAsk.map(x => x[0]).includes(data.ask[j][0])) {
            updatedAsk.push(data.bids[j]);
            break;
        }
    }
    updatedAsk.sort((x, y) => Number(y[0]) > Number(x[0]) ? -1 : 1);
    return updatedAsk; 


      })
    },`DEPTH-${market}`)

    


  

  
  })();

  return () => {
    SignalingManager.getInstance().deRegisterCallback("depth", market);
    SignalingManager.getInstance().sendMessage({
      method: "UNSUBSCRIBE",
      params: [`trade.${market}`],
    });
  };


},[])



  if(!ask){
    return <div className="flex items-center flex-row relative h-full w-full overflow-hidden px-3 hover:border-t hover:border-dashed hover:border-baseBorderFocus/50 cursor-pointer pl-32">
        <div className="z-10 w-[30%] text-left text-xs font-normal tabular-nums text-red-600">

    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
        </div>
</div>
  }

  return (
    <>
      {ask &&
        ask
          .slice(0, 9)
          .reverse()
          .map(function (a, index) {
            return (
              <div key={index}>
                <div className="flex items-center flex-row relative h-full w-full overflow-hidden px-3 hover:border-t hover:border-dashed hover:border-baseBorderFocus/50 cursor-pointer">
                  <div
                    style={{
                      position: "absolute",
                      top: "1px",
                      bottom: "1px",
                      right: "0px",
                      width: "7.1%",
                      background: "#7C3034",
                      transition: "width 0.4s ease-in-out 0s",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "1px",
                      bottom: "1px",
                      right: "0px",
                      width: "7.1%",
                      background: "#7C3034",
                      transition: "width 0.4s ease-in-out 0s",
                    }}
                  ></div>
                  <p className="z-10 w-[30%] text-left text-xs font-normal tabular-nums text-red-600">
                    {a[0]}
                  </p>
                  <p className="z-10 w-[30%] text-right text-xs font-normal">
                    {a[1]}
                  </p>
                  <p className="z-10 w-[40%] text-right text-xs font-normal ">
                    {a[1]}
                  </p>
                </div>
              </div>
            );
          })}
    </>
  );
}

function BidTable({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>([]);
  const [cumsum, setCumsum] = useState<number[]>();
  useEffect(() => {
   
    SignalingManager.getInstance().registerCallback("depth",(data:any)=>{

      console.log('bids data ', data)

      setBids((originlBids)=>{
        const updatedBids=[...(originlBids || [])]

        for(let i =0; i<originlBids?.length;i++){
          for(let j=0;j<data.bids.length;j++){
            if (updatedBids[i][0] === data.bids[j][0]) {
              updatedBids[i][1] = data.bids[j][1];
              if (Number(updatedBids[i][1]) === 0) {
                updatedBids.splice(i, 1);
              }
              break;
            }
          }
        }

        for (let j = 0; j < data.bids.length; j++) {
          if (Number(data.bids[j][1]) !== 0 && !updatedBids.map(x => x[0]).includes(data.bids[j][0])) {
            updatedBids.push(data.bids[j]);
          }
        }

        updatedBids.sort((x, y) => Number(y[0]) > Number(x[0]) ? -1 : 1);
        return updatedBids;

      })

    },`DEPTH-${market}`)


    return () => {
      SignalingManager.getInstance().deRegisterCallback("depth", market);
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });
    };


  }, [market,bids]);



  return (
    <>
      {bids &&
        bids.splice(0, 8).map(function (b, index) {
          return (
            <div key={index}>
              <div className="flex items-center flex-row relative h-full w-full overflow-hidden px-3 hover:border-t hover:border-dashed hover:border-baseBorderFocus/50 cursor-pointer">
                <div
                  style={{
                    position: "absolute",
                    top: "1px",
                    bottom: "1px",
                    right: "0px",
                    width: "7.1%",
                    background: "#16362E",
                    transition: "width 0.4s ease-in-out 0s",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "1px",
                    bottom: "1px",
                    right: "0px",
                    width: "7.1%",
                    background: "#16362E",
                    transition: "width 0.4s ease-in-out 0s",
                  }}
                ></div>
                <p className="z-10 w-[30%] text-left text-xs font-normal tabular-nums text-green-500">
                  {b[0]}
                </p>
                <p className="z-10 w-[30%] text-right text-xs font-normal tabular-nums ">
                  {b[1]}
                </p>
                <p className="z-10 w-[40%] text-right text-xs font-normal tabular-nums">
                  {/* {cumsum && cumsum[index]} */}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
}


// cumulative sum
function cumulativeSum(ask: [string, string][]) {
  const size: any[] = [];
  let sum: number = 0;
  for (let i = 0; i <= ask.length - 1; i++) {
    sum += parseFloat(ask[i][1]);
    size.push(sum);
  }
  // console.log(size)

  return size;
}

