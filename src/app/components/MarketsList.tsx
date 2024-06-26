export default function MarketsList() {
    return (
      <>
      <div className="text-[#969FA1]">
          
        <MarketListHeader />
        <div className="flex flex-col rounded-lg bg-baseBackgroundL1 py-3 bg-[#14151B] min-w-[700px]">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  Name
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  Price
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  Market Cap
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  24h Volumn
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  24h Change
                </th>
                <th className="px-2 py-3 text-left text-sm font-normal text-baseTextMedEmphasis first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                  24 Price
                </th>
              </tr>
            </thead>
          </table>
        </div>
  </div>
      </>
    );
  }
  
  export function MarketListHeader(){
    return <>
    <div className="flex flex-row mt-8">
        <div className="flex flex-col">
            <div className="mx-auto flex space-x-2">
                <div className="cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90">
                All

                </div>
                <div className="cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90">
                Spot

                </div>
                <div className="cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90">
                Exprimental

                </div>
                <div className="cursor-pointer rounded-lg px-3 py-1 text-base font-medium capitalize text-baseTextMedEmphasis outline-none selected:bg-blue-600/[16%] selected:text-accentBlue/90">
                Favorites

                </div>

            </div>

        </div>
    </div>
    </>
}