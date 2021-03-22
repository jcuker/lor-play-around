import Region, { RegionProps } from "Components/Region/Region";
import { REGIONS, REGION_TO_SHORT_CODE } from "Constants/constants";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function DefaultContent() {
   const [selectedRegions, setSelectedRegions] = useState<any[]>([]);
   const [deckCode, setDeckCode] = useState("");
   const history = useHistory();

   function handleClick({ name }: RegionProps) {
      const idx = selectedRegions.indexOf(name);

      if (idx >= 0) {
         selectedRegions.splice(idx, 1);
         setSelectedRegions([...selectedRegions]);
      } else setSelectedRegions([...selectedRegions, name]);
   }

   function transition() {
      if (selectedRegions.length > 0) {
         let historyString: string = selectedRegions
            .map((region) => REGION_TO_SHORT_CODE[region])
            .reduce((prev, curr) => prev + curr + ",", "");

         historyString = historyString.substr(0, historyString.length - 1);

         history.push(`?region=${historyString}`);
      } else {
         history.push(`?code=${deckCode}`);
      }
   }

   return (
      <div
         className="flex flex-col justify-center items-center"
         style={{ minHeight: "100vh" }}
      >
         <div className="flex flex-col justify-center items-center mb-12">
            <div className="text-gray-100">
               Pick the region(s) you're playing against
            </div>
            <div className="flex flex-row flex-wrap justify-center mb-8 mt-8 gap-3">
               {REGIONS.map((region) => (
                  <Region
                     key={region}
                     name={region}
                     onClick={handleClick}
                     selected={selectedRegions.includes(region)}
                  />
               ))}
            </div>
            <div className="text-gray-100">
               ...or enter a specific deck code.
            </div>
            <input
               value={deckCode}
               onChange={(e) => setDeckCode(e.target.value)}
               style={{ alignSelf: "center", justifySelf: "center" }}
               className="m-8 w-full h-10 px-3 text-base placeholder-gray-500 border-gray-900 rounded-lg bg-gray-400"
               type="text"
               placeholder="Deck Code"
            />
            <button
               className="flex bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed"
               type="button"
               style={{
                  transition: "all .15s ease",
               }}
               disabled={selectedRegions.length === 0 && deckCode === ""}
               onClick={transition}
            >
               Show Me What to Play Around
            </button>
         </div>
      </div>
   );
}
