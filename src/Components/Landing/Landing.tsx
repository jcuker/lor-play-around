import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { REGION_TO_SHORT_CODE } from "Constants/constants";
import Region, { RegionProps } from "Components/Region/Region";

function Landing() {
   const [regions, setRegions] = useState<any[]>([]);
   const history = useHistory();
   const ref = useRef<HTMLDivElement>(null);
   const [minHeight, setMinHeight] = useState(0);

   useEffect(() => {
      setMinHeight(ref.current?.clientHeight || 0);
   }, [ref]);

   const memoRegions = useMemo(() => {
      return regions.map((name: string) => {
         return <Region key={name} name={name} />;
      });
   }, [regions]);

   function handleClick({ name }: RegionProps) {
      const idx = regions.indexOf(name);

      if (idx >= 0) {
         regions.splice(idx, 1);
         setRegions([...regions]);
      } else setRegions([...regions, name]);
   }

   function transition() {
      let historyString: string = regions
         .map((region) => REGION_TO_SHORT_CODE[region])
         .reduce((prev, curr) => prev + curr + ",", "");

      historyString = historyString.substr(0, historyString.length - 1);

      history.push(`/around/${historyString}`);
   }

   return (
      <div
         className="flex flex-col justify-center items-center"
         style={{ minHeight: "100vh" }}
      >
         <div className="flex flex-col justify-center items-center mb-12">
            <div className="text-gray-100">
               Pick the region(s) you're playing against.
            </div>
            <div className="flex flex-row flex-wrap justify-center" ref={ref}>
               <Region name="Bilgewater" onClick={handleClick} />
               <Region name="Demacia" onClick={handleClick} />
               <Region name="Freljord" onClick={handleClick} />
               <Region name="Ionia" onClick={handleClick} />
               <Region name="Noxus" onClick={handleClick} />
               <Region name="Piltover & Zaun" onClick={handleClick} />
               <Region name="Shadow Isles" onClick={handleClick} />
               <Region name="Shurima" onClick={handleClick} />
               <Region name="Targon" onClick={handleClick} />
            </div>
         </div>
         <div className="flex flex-col justify-center items-center">
            <div className="text-gray-100">I'm playing against:</div>
            <div
               className="flex flex-row flex-wrap justify-center"
               style={{ minHeight }}
            >
               {memoRegions}
            </div>
            <button
               className="flex bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed"
               type="button"
               style={{
                  transition: "all .15s ease",
               }}
               disabled={regions.length === 0}
               onClick={transition}
            >
               Show Me What to Play Around
            </button>
         </div>
      </div>
   );
}

export default Landing;
