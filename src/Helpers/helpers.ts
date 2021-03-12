import metadata from "../Constants/metadata.json";
import card from "@images/card.svg";

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
