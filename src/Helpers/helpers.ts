import metadata from "../Constants/metadata.json";
import card from "@images/card.svg";
import { SCREEN_BREAKPOINTS } from "Constants/constants";

export function getCardsForRegion(region: string) {
   return (metadata as Record<string, any>)[region];
}

export function filterCardsForRegionByList(region: string, list: string[]) {
   return getCardsForRegion(region).filter(
      (card: any) => list.includes(card.name) || list.includes(card.code)
   );
}

export function getKeywordUrl(keyword: string) {
   return keyword === "Unit"
      ? card
      : process.env.REACT_APP_KEYWORDS_CDN + keyword + ".svg";
}

export function getCardScaleFromScreenSize(): number {
   const screenWidth = window.innerWidth;

   if (screenWidth <= SCREEN_BREAKPOINTS.xs) {
      return 6;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.sm) {
      return 5.5;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.md) {
      return 4.25;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.lg) {
      return 3.75;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.xl) {
      return 3;
   } else {
      return 0;
   }
}

export function getRegionScaleFromScreenSize(): number {
   const screenWidth = window.innerWidth;

   if (screenWidth <= SCREEN_BREAKPOINTS.xs) {
      return 3;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.sm) {
      return 2.5;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.md) {
      return 2;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.lg) {
      return 1.5;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.xl) {
      return 1;
   } else {
      return 0;
   }
}
