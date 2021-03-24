import { getMetaDecks } from "Api/mobalytics";
import { MetaDeck } from "Constants/types";
import { getChampsFromDeck } from "Helpers/helpers";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function MetaDecks() {
   const [decks, setDecks] = useState<MetaDeck[]>([]);
   const history = useHistory();

   useEffect(() => {
      async function getDecks() {
         const resp = await getMetaDecks();
         resp.sort((a, b) => (a.playRate > b.playRate ? -1 : 1));
         setDecks(resp);
      }

      getDecks();
   }, []);

   function transition(code: string) {
      history.push(`/?code=${code}`);
   }

   return (
      <div className="flex flex-row flex-wrap gap-3">
         {decks.map((deck) => (
            <div
               className="w-80 rounded overflow-hidden shadow-xl h-96 flex flex-col bg-gray-600 hover:bg-gray-200"
               onClick={() => transition(deck.cardsCode)}
            >
               {}
               <div className="px-6 py-4 mt-auto">
                  <div className="font-bold text-xl mb-2 text-center dark:text-white">
                     {getChampsFromDeck(deck.cardsCode)}
                  </div>
                  <p className="text-gray-100 text-base text-left dark:text-gray-200">
                     {`Win Rate: ${(
                        (deck.wins / deck.matchesCollected) *
                        100
                     ).toFixed(1)}% | Play Rate: ${(
                        deck.playRate * 100
                     ).toFixed(1)}%`}
                  </p>
               </div>

               <div className="flex flex-row justify-center">
                  {deck.regions.map((region) => (
                     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 w-12">
                        {region}
                     </span>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
}
