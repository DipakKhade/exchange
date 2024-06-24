"use client";
import { usePathname , useRouter } from "next/navigation"

export default function Header(){
    const path =usePathname()
    const router=useRouter()
    console.log(path)
 return <>
 
 <div className="flex h-14 w-full flex-col justify-center pl-[21px] pr-4">
        <div className="flex flex-row justify-between">
        <ul className="flex items-center flex-row p-12">
            <li className={`ml-[20px] mr-[20px] flex flex-row items-center justify-center ${path.startsWith('/markets') ? 'text-white' : 'text-slate-500'}`}

             onClick={()=>router.push('/markets')}>Markets</li>

            <li className={`ml-[20px] mr-[20px] flex flex-row items-center justify-center ${path.startsWith('/treads') ? 'text-white' : 'text-slate-500'} `} onClick={()=>router.push('/treads')}>Treads</li>

            {/* <li className="ml-[20px] mr-[20px] flex flex-row items-center justify-center">More</li> */}

        </ul>
            <div className="flex flex-row">

                <button className="my-auto ml-10 text-nowrap rounded-lg text-[#00c278] px-3 py-1.5 text-sm font-semibold text-greenText hover:opacity-90 bg-[rgb(12,44,36)]">Sign up</button>

                <button className="my-auto ml-10 text-nowrap rounded-lg text-[rgb(76,148,255)] px-3 py-1.5 text-sm font-semibold text-greenText hover:opacity-90 bg-[#18253A]">Sign in</button>
                
            </div>
        </div>
        
    </div>
 </>
}