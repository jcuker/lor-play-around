import { getMetaDecks } from "Api/mobalytics";
import { MetaDeck } from "Constants/types";
import React, { useEffect, useMemo, useState } from "react";
import MetaDeckElement from "./MetaDeckElement";

export default function MetaDecks() {
   const [decks, setDecks] = useState<MetaDeck[]>([]);
   // Number of decks to request, not always what you get back though
   const numDecks = 20;

   useEffect(() => {
      async function getDecks() {
         const resp = await getMetaDecks(numDecks);
         resp.sort((a, b) => (a.playRate > b.playRate ? -1 : 1));
         setDecks(resp);
      }

      getDecks();
   }, []);

   const deckElements = useMemo(() => {
      return decks.map((deck) => <MetaDeckElement deck={deck} />);
   }, [decks]);

   return (
      <div style={{ minHeight: "100vh" }} className="flex flex-col">
         <span className="text-gray-100 text-center mt-4 text-lg font-bold">
            The Top {decks.length} Meta Decks
         </span>
         <div className="flex flex-row flex-wrap gap-3 justify-evenly items-center p-6">
            {deckElements}
         </div>
      </div>
   );
}
