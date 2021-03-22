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

export interface URLParams {
   list?: string;
   code?: string;
}

// TODO - make mana a range only selct one and then show for that down
export default function PlayAround() {
   const location = useLocation();
   const [regions, setRegions] = useState<string[]>([]);
   const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

   const cards = useMemo(() => {
      if (Object.keys(state.cardList).length === 0) return {};

      let matchingCards = regions.flatMap((region) =>
         filterCardsForRegionByList(region, state.cardList[region])
      );

      if (state.manaFilter !== 7) {
         matchingCards = matchingCards.filter((card: Card) => {
            return card.cost <= state.manaFilter;
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

   useEffect(() => {
      function listenForNumPressed(ev: KeyboardEvent) {
         let filter = 0;

         switch (ev.code) {
            case "Digit1":
               filter = 1;
               break;
            case "Digit2":
               filter = 2;
               break;
            case "Digit3":
               filter = 3;
               break;
            case "Digit4":
               filter = 4;
               break;
            case "Digit5":
               filter = 5;
               break;
            case "Digit6":
               filter = 6;
               break;
            case "Digit7":
            case "Digit8":
            case "Digit9":
               filter = 7;
               break;
            default:
               break;
         }

         if (filter > 0) dispatch({ type: "SetManaFilter", payload: filter });
         else if (ev.code === "Equal") {
            dispatch({ type: "IncreaseUserScale" });
         } else if (ev.code === "Minus") {
            dispatch({ type: "DecreaseUserScale" });
         }
      }

      document.addEventListener("keydown", listenForNumPressed);

      return () => {
         document.removeEventListener("keydown", listenForNumPressed);
      };
   }, [dispatch]);

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
