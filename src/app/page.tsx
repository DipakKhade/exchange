
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const MarketsList=dynamic(() => import('./components/MarketsList'), { ssr: false })

export default function Home() {
  return (
    <WidthWrapper>

  <main>
    
    <MarketsList/>
  </main>
    </WidthWrapper>
  );
}


export function WidthWrapper({children}:{children:ReactNode}){

  return<>
  <div className="w-[88vw] m-auto">
    {children}

  </div>
  </>
}