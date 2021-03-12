import { getList } from "Api/api";
import Region from "Components/Region/Region";
import { SHORT_CODE_TO_REGION } from "Constants/constants";
import { filterCardsForRegionByList } from "Helpers/helpers";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import KeywordSection from "./KeywordSection";

export default function PlayAround() {
   const location = useLocation();
   const [regions, setRegions] = useState<string[]>([]);
   const [expandedList, setExpandedList] = useState<Record<string, any[]>>({});

   const cards = useMemo(() => {
      if (Object.keys(expandedList).length === 0) return {};

      const matchingCards = regions.flatMap((region) =>
         filterCardsForRegionByList(region, expandedList[region])
      );

      const cardsSplitBySpeed = matchingCards.reduce((acc, curr) => {
         if (!curr.speed) curr.speed = "Unit";
         if (!acc[curr.speed]) acc[curr.speed] = [];
         acc[curr.speed].push(curr);
         return acc;
      }, {});

      return cardsSplitBySpeed;
   }, [regions, expandedList]);

   useEffect(() => {
      async function func() {
         const list = await getList("default", true);
         setExpandedList(list);

         const pathSplit = location.pathname.split("/");
         const incomingRegions = pathSplit[pathSplit.length - 1]
            .split(",")
            .map((r) => SHORT_CODE_TO_REGION[r]);

         setRegions(incomingRegions);
      }

      func();
   }, [location]);

   return (
      <div className="flex flex-col">
         <div className="flex flex-row justify-center flex-wrap">
            {regions.map((region) => (
               <Region key={region} name={region} />
            ))}
         </div>
         <div className="flex flex-row items-start flex-wrap">
            {Object.keys(cards).map((keyword) => {
               const cardsForKeyword = cards[keyword].sort((a: any, b: any) =>
                  a.cost > b.cost ? 1 : -1
               );
               return (
                  <KeywordSection
                     key={keyword}
                     keyword={keyword}
                     cards={cardsForKeyword}
                  />
               );
            })}
         </div>
      </div>
   );
}
