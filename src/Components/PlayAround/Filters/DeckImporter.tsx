import { useState } from "react";
import { PlayAroundAction } from "../reducer";
import { decode, Card as DecodedCard } from "lor-deckcode";
import { getRegionFromCardCode } from "Helpers/helpers";
import { useHistory } from "react-router";

interface Props {
   dispatch: React.Dispatch<PlayAroundAction>;
}
export default function DeckImporter({ dispatch }: Props) {
   const history = useHistory();
   const [value, setValue] = useState("");

   async function importDeck() {
      const decodedDeck = decode(value);

      if (decodedDeck.length === 0) {
         console.warn("invalid deck code");
         return;
      }

      const regions = decodedDeck
         .map((val) => getRegionFromCardCode(val.code))
         .filter((value, index, self) => self.indexOf(value) === index);

      const decodedToList = decodedDeck.map((val: DecodedCard) => val.code);
      let historyString: string = regions.reduce(
         (prev, curr) => prev + curr + ",",
         ""
      );

      historyString = historyString.substr(0, historyString.length - 1);

      history.push(`/around/${historyString}`);
      //dispatch({ type: "SetCardList", payload: { ...decodedToList } });
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
            className="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
         >
            Import
         </button>
      </>
   );
}
