import { getList } from "Api/api";
import Region from "Components/Region/Region";
import { SHORT_CODE_TO_REGION } from "Constants/constants";
import { Card } from "Constants/types";
import { filterCardsForRegionByList } from "Helpers/helpers";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useLocation } from "react-router";
import Filters from "./Filters/Filters";
import KeywordSection from "./KeywordSection";
import { reducer, INITIAL_STATE } from "./reducer";

export default function PlayAround() {
   const location = useLocation();
   const [regions, setRegions] = useState<string[]>([]);
   const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

   const cards = useMemo(() => {
      if (Object.keys(state.cardList).length === 0) return {};

      let matchingCards = regions.flatMap((region) =>
         filterCardsForRegionByList(region, state.cardList[region])
      );

      if (state.manaFilter.length > 0) {
         matchingCards = matchingCards.filter((card: Card) => {
            return (
               state.manaFilter.includes(card.cost) ||
               (state.manaFilter.includes(7) && card.cost >= 7)
            );
         });
      }

      const cardsSplitBySpeed = matchingCards.reduce((acc, curr) => {
         if (!curr.speed) curr.speed = "Unit / Landmark";
         if (!acc[curr.speed]) acc[curr.speed] = [];
         acc[curr.speed].push(curr);
         return acc;
      }, {});

      return cardsSplitBySpeed;
   }, [state.cardList, regions, state.manaFilter]);

   useEffect(() => {
      async function func() {
         const list = await getList("default", true);
         dispatch({ type: "SetCardList", payload: list });

         const pathSplit = location.pathname.split("/");
         const incomingRegions = pathSplit[pathSplit.length - 1]
            .split(",")
            .map((r) => SHORT_CODE_TO_REGION[r] || "")
            .filter((r) => !!r);

         setRegions(incomingRegions);
      }

      func();
   }, [location]);

   return (
      <div className="flex flex-col">
         <Filters
            dispatch={dispatch}
            manaFilter={state.manaFilter}
            scale={state.userScale}
         />
         <div
            className={`flex flex-row justify-center flex-wrap gap-3 mb-4 p-16 ${
               !state.showRegions ? "hidden" : ""
            }`}
         >
            {regions.map((region) => (
               <Region key={region} name={region} />
            ))}
         </div>
         <div className="flex flex-row items-start flex-wrap mt-4">
            {Object.keys(cards)
               .sort()
               .map((keyword) => {
                  const cardsForKeyword = cards[
                     keyword
                  ].sort((a: any, b: any) => (a.cost > b.cost ? 1 : -1));
                  return (
                     <KeywordSection
                        userScale={state.userScale}
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
