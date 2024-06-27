'use client';
import { createChart, ColorType } from 'lightweight-charts';
import { useRef, useEffect } from 'react';
import { SignalingManger } from '../utils/signalingManger';

export default function Chart() {
    const container = useRef<HTMLDivElement>(null);
    // const getTickerData=SignalingManger.getInstance()

    useEffect(() => {
        if (container.current) {
            const chartOptions = { 
                layout: { 
                    textColor: '#8992A1', 
                    background: { 
                        type: ColorType.Solid, 
                        color: '#0E0F14' 
                    } 
                } 
            };
            const chart = createChart(container.current, chartOptions);
            const candlestickSeries = chart.addCandlestickSeries({ 
                
                upColor: '#26a69a', 
                downColor: '#ef5350', 
                borderVisible: false, 
                wickUpColor: '#26a69a', 
                wickDownColor: '#ef5350' 
            });
            const data = [
                { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 }, 
                { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 }, 
                { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, 
                { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, 
                { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, 
                { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, 
                { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, 
                { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, 
                { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, 
                { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }
                // {
                //     "firstPrice": 0.2473,
                //     "high": 0.2529,
                //     "lastPrice": 0.2529,
                //     "low": 0.2473,
                //     "priceChange": 0.0056,
                //     "priceChangePercent": 0.022645,
                //     "quoteVolume": 658.390612,
                //     "symbol": "BLUR_USDC",
                //     "trades": 4,
                //     "volume": 2616.46
                //     },
            
            ];

      //@ts-ignore
            candlestickSeries.setData(data);
            chart.timeScale().fitContent();
        }
    }, []);

    return (
        <div ref={container} style={{ width: '100%', height: '300px' }}>
        </div>
    );
}



export function ChartHeaderBar(){
    return<>
       <div className='flex items-center justify-between flex-row px-4 w-[58vw] pb-3'>
            <p className='font-medium text-sm text-baseTextMedEmphasis'>Chart</p>
            <div className='flex flex-row flex-0 gap-5 undefined'>
                <div className='flex flex-col cursor-pointer justify-center py-2'>
                    <div className='text-sm font-medium py-1 border-b-2 border-accentBlue text-baseTextHighEmphasis'>Trading View</div>

                </div>
                <div className='flex flex-col cursor-pointer justify-center py-2'>
                    <div className='text-sm font-medium py-1 border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis'>Depth</div>
                </div>
            </div>
        </div>
    </>
}



  // {
                //     "firstPrice": 0.2473,
                //     "high": 0.2529,
                //     "lastPrice": 0.2529,
                //     "low": 0.2473,
                //     "priceChange": 0.0056,
                //     "priceChangePercent": 0.022645,
                //     "quoteVolume": 658.390612,
                //     "symbol": "BLUR_USDC",
                //     "trades": 4,
                //     "volume": 2616.46
                //     },

// priceChange=firstPrice-lastPrice

// high
// low
// open
// close

//         function get(high:string,low:string,firstPrice:string,){

//         }