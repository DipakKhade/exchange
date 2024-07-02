"use client";
import { useState } from "react";

enum Tab {
  Buy,
  Sell,
}

export function SwapAssets() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Buy);
  const [price, setPrice] = useState<number>();
  const [quantity, setQuantity] = useState<number>();

  return (
    <div className="flex flex-col border border-[#202127] border-l-0 border-r-0 w-[280px]">
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

      <div className="flex flex-col px-3">
        <div className="flex flex-col flex-1 gap-3 text-gray-900">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-normal text-gray-500">
                Available Balance
              </p>
              <p className="font-medium text-xs text-slate-100">0.00 USDC</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-normal text-gray-500">Price</p>
            <div className="flex flex-col relative">
              <input
                step="0.01"
                placeholder="0"
                className="h-12 rounded-lg border-2 border-solid border-gray-30 pr-12 text-right text-2xl leading-9  ring-0 transition focus:border-blue-500 focus:ring-0 "
                type="text"
                onChange={(e: any) => setPrice(Number(e.target.value))}
              />
              <div className="flex flex-row absolute right-1 top-1 p-2">
                <div className="relative"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-normal text-gray-500">Quantity</p>
            <div className="flex flex-col relative">
              <input
                step="0.01"
                placeholder="0"
                className="h-12 rounded-lg border-2 border-solid border-gray-300 pr-12 text-right text-2xl leading-9 ring-0 transition focus:border-blue-500 focus:ring-0"
                type="text"
                onChange={(e: any) => setQuantity(Number(e.target.value))}
              />
              <div className="flex flex-row absolute right-1 top-1 p-2">
                <div className="relative"></div>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="font-medium pr-2 text-xs text-gray-500">
                ≈ 0.00 USDC
              </p>
            </div>
            <div className="flex justify-center mt-2 gap-3">
              <div className="flex items-center justify-center px-4 py-1 text-xs cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full">
                25%
              </div>
              <div className="flex items-center justify-center px-4 py-1 text-xs cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full">
                50%
              </div>
              <div className="flex items-center justify-center px-4 py-1 text-xs cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full">
                75%
              </div>
              <div className="flex items-center justify-center px-4 py-1 text-xs cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full">
                Max
              </div>
            </div>
          </div>
          <button
            type="button"
            className="font-semibold focus:ring-2 focus:ring-blue-200 hover:opacity-90 disabled:opacity-80 text-center text-white bg-blue-500 h-12 rounded-xl px-4 py-2"
            data-rac=""
          >
            Sign up to trade
          </button>
        </div>
      </div>
    </div>
  );
}
