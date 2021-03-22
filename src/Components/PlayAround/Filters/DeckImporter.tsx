import { useState } from "react";
import { useHistory } from "react-router";

export default function DeckImporter() {
   const history = useHistory();
   const [value, setValue] = useState("");

   async function importDeck() {
      history.push(`/around?code=${value}`);
   }

   return (
      <>
         <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ alignSelf: "center", justifySelf: "center" }}
            className="w-full h-10 px-3 text-base text-gray-100 placeholder-gray-500 border-gray-900 rounded-lg bg-gray-800"
            type="text"
            placeholder="Deck Code"
         />
         <button
            onClick={importDeck}
            style={{ alignSelf: "center", justifySelf: "center" }}
            className="h-8 px-4 m-2 text-sm transition-colors duration-150 bg-blue-300 rounded-lg focus:shadow-outline hover:bg-indigo-800"
         >
            Import
         </button>
      </>
   );
}
