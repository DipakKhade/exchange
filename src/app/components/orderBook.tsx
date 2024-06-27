"use client";
import { Depth } from "../utils/types";
import { getDepth } from "../utils/getData";
import { useEffect, useState } from "react";
import { reverse } from "dns";

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
              className="rounded-2xl text-baseIcon transition hover:bg-baseBackgroundL2 hover:text-white p-1 !rounded-md bg-transparent"
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
          <button className="rounded-2xl text-baseIcon transition hover:bg-baseBackgroundL2 hover:text-white p-1 !rounded-md bg-baseBackgroundL2">
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

  useEffect(function () {
    (async () => {
      const data = await getDepth(symbol);
      // console.log(data)
    })();
  }, []);

  console.log(symbol);

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
        <BidTable market={symbol as string} />
        <div>actual price</div>
        <AskTable market={symbol as string} />
      </div>
    </>
  );
}

function AskTable({ market }: { market: string }) {
  const [ask, setAsk] = useState<[string, string][]>();

  useEffect(() => {
    (async () => {
      let a = await getDepth(market);
      setAsk(a.asks);
    })();
  }, [market]);

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
                  <p className="z-10 w-[30%] text-left text-xs font-normal tabular-nums text-green-600">
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
  const [bids, setBids] = useState<[string, string][]>();
  const [cumsum, setCumsum] = useState<number[]>();
  useEffect(() => {
    (async () => {
      let a = await getDepth(market);
      setBids(a.bids.reverse());
      setCumsum(cumulativeSum(a.bids.reverse().splice(0, 8)));
      console.log(cumsum);
    })();
  }, [market]);

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
                <p className="z-10 w-[30%] text-left text-xs font-normal tabular-nums text-red-500">
                  {b[0]}
                </p>
                <p className="z-10 w-[30%] text-right text-xs font-normal tabular-nums ">
                  {b[1]}
                </p>
                <p className="z-10 w-[40%] text-right text-xs font-normal tabular-nums">
                  {cumsum && cumsum[index]}
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

const BLUR_USDC = {
  asks: [
    ["0.2385", "1258.31"],
    ["0.2386", "4192.72"],
    ["0.2387", "12571.20"],
    ["0.2407", "41565.84"],
    ["0.6977", "430.05"],
    ["1.1930", "80.49"],
    ["3.2400", "104.00"],
    ["5.2491", "110.00"],
    ["13.0612", "101.00"],
    ["51.2496", "13.41"],
    ["82.2496", "13.42"],
    ["300.0000", "1.00"],
  ],
  bids: [
    ["0.0100", "100.00"],
    ["0.0113", "2742.08"],
    ["0.0271", "19448.94"],
    ["0.1278", "445.70"],
    ["0.1900", "50.00"],
    ["0.2023", "2431.11"],
    ["0.2360", "42376.59"],
    ["0.2381", "12600.73"],
    ["0.2382", "4198.38"],
    ["0.2383", "1259.03"],
  ],
  lastUpdateId: "7827734",
};
