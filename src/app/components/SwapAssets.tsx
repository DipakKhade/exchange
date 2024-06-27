"use client";
import { useState } from "react";

enum Tab {
  Buy,
  Sell,
}
export function SwapAssets() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Buy);

  return (
    <div className="flex flex-col border border-[#202127] border-l-0 border-r-0">
      <div className="flex flex-col w-[280px]">
        <div className="flex flex-row h-[60px]">
          <div className="flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 border-b-greenBorder bg-greenBackgroundTransparent">
            <p
              className={`text-center text-sm font-semibold leading-[60px] text-green-500 ${
                activeTab == Tab.Buy ? "bg-[#0D1D1B]" : ""
              }`}
              onClick={() => setActiveTab(Tab.Buy)}
            >
              Buy
            </p>
          </div>

          <div className="flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 border-b-baseBorderMed hover:border-b-baseBorderFocus">
            <p
              className={`text-center text-sm font-semibold leading-[60px] text-red-500 ${
                activeTab == Tab.Sell ? "bg-[#281419]" : ""
              }`}
              onClick={() => setActiveTab(Tab.Sell)}
            >
              Sell
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="px3">
          <div className="flex flex-row flex-0 gap-5 undefined">
            <div className="flex flex-col cursor-pointer justify-center py-2">
              <p className="text-sm font-medium py-1 border-b-2 border-accentBlue text-baseTextHighEmphasis">
                Limit
              </p>
            </div>

            <div className="flex flex-col cursor-pointer justify-center py-2">
              <p className="text-sm font-medium py-1 border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis">
                Market
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
