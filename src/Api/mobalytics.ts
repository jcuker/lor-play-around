import { MetaDeck, MobalyticsMetaStatResponse } from "Constants/types";

export async function getMetaDecks(count: number = 20): Promise<MetaDeck[]> {
   const url = `https://lor.mobalytics.gg/api/v2/meta/statistics/decks?sortBy=matchesDesc&from=0&count=${count}`;

   try {
      const resp = await fetch(url);
      const json: MobalyticsMetaStatResponse = await resp.json();
      return [...json.decksStats];
   } catch (err) {
      console.error(err);
      return [];
   }
}
