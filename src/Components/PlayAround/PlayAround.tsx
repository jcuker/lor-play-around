import { getList } from "Api/api";
import Region from "Components/Region/Region";
import { SHORT_CODE_TO_REGION } from "Constants/constants";
import { Card, DecodedCard, DisplayCard } from "Constants/types";
import {
   convertDecodedCardsToDisplayCards,
   decodeDeck,
   filterCardsForRegionByList,
   getRegionFromCardCode,
} from "Helpers/helpers";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useLocation } from "react-router";
import Filters from "./Filters/Filters";
import KeywordSection from "./KeywordSection";
import { reducer, INITIAL_STATE } from "./reducer";

export interface URLParams {
   code?: string;
   region?: string;
}

export default function PlayAround() {
   const location = useLocation();
   const [regions, setRegions] = useState<string[]>([]);
   const [decodedCards, setDecodedCards] = useState<DecodedCard[]>();
   const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

   useEffect(
      function onMount() {
         async function asyncWrapper() {
            const queryStringObj = location.search.substring(1).split("&");

            if (queryStringObj.length === 0) {
               console.warn("Need a QS");
               return;
            }

            const parsedQueryString = queryStringObj.reduce(
               (acc: Record<string, string>, curr: string) => {
                  const keyValArr = curr.split("=");
                  const newAcc = { ...acc };
                  newAcc[keyValArr[0]] = keyValArr[1];
                  return newAcc;
               },
               {}
            );

            if (parsedQueryString["region"]) {
               const regionStr = queryStringObj[0].split("=")[1];
               const incomingRegions = regionStr
                  .split(",")
                  .map((r) => SHORT_CODE_TO_REGION[r] || "")
                  .filter((r) => !!r);

               setRegions(incomingRegions);
            }

            let cardList = await getList("default", true);

            if (parsedQueryString["code"]) {
               const decoded = decodeDeck(parsedQueryString["code"]);
               const regions = decoded
                  .map((val) => getRegionFromCardCode(val.code, false))
                  .filter(
                     (value, index, self) => self.indexOf(value) === index
                  );
               setRegions(regions);
               setDecodedCards(decoded);
            }

            dispatch({ type: "SetCardList", payload: cardList });
         }

         asyncWrapper();
      },
      [location]
   );

   const cards = useMemo(() => {
      if (Object.keys(state.cardList).length === 0) return {};

      let matchingCards: DisplayCard[] = state.showFullDeck
         ? convertDecodedCardsToDisplayCards(decodedCards)
         : regions.flatMap((region) => {
              return filterCardsForRegionByList(
                 region,
                 state.cardList[region],
                 decodedCards
              );
           });

      if (state.manaFilter !== 7) {
         matchingCards = matchingCards.filter((card: Card) => {
            return card.cost <= state.manaFilter;
         });
      }

      const cardsSplitBySpeed = matchingCards.reduce(
         (acc: Record<string, DisplayCard[]>, curr: DisplayCard) => {
            if (!curr.speed) curr.speed = "Unit / Landmark";
            if (!acc[curr.speed]) acc[curr.speed] = [];
            acc[curr.speed].push(curr);
            return acc;
         },
         {}
      );

      return cardsSplitBySpeed;
   }, [
      state.cardList,
      state.manaFilter,
      state.showFullDeck,
      regions,
      decodedCards,
   ]);

   useEffect(() => {
      function keyListener(ev: KeyboardEvent) {
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
         } else if (decodedCards && ev.code === "KeyF") {
            dispatch({ type: "ToggleShowFullDeck" });
         }
      }

      document.addEventListener("keydown", keyListener);

      return () => {
         document.removeEventListener("keydown", keyListener);
      };
   }, [dispatch]);

   return (
      <div className="flex flex-col">
         <Filters
            dispatch={dispatch}
            manaFilter={state.manaFilter}
            scale={state.userScale}
            showFullDeck={state.showFullDeck}
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
