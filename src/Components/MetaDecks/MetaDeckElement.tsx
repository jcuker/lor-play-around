import Region from 'Components/Region/Region';
import {
   DECKCODE_REGION_TO_SHORT_CODE,
   NO_CHAMP,
   SHORT_CODE_TO_REGION,
} from 'Constants/constants';
import { MetaDeck } from 'Constants/types';
import { getChampsFromDeck } from 'Helpers/helpers';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
   deck: MetaDeck;
}

export default function MetaDeckElement({ deck }: Props) {
   const history = useHistory();

   function transition(code: string) {
      history.push(`/?code=${code}`);
   }

   const champs = useMemo(() => {
      const champsFromDeck = getChampsFromDeck(deck.cardsCode);

      if (champsFromDeck.length === 0) {
         champsFromDeck.push(NO_CHAMP);
      }

      return champsFromDeck;
   }, [deck.cardsCode]);

   const champArtwork = useMemo(() => {
      return champs.map((champ) => (
         <img
            key={champ.name}
            style={{
               flex: 1,
               maxWidth: `${Math.min(50, 100 / champs.length)}%`,
            }}
            src={champ.art}
            alt={champ.name}
         />
      ));
   }, [champs]);

   const regions = useMemo(() => {
      return deck.regions
         .map((region) => DECKCODE_REGION_TO_SHORT_CODE[region])
         .map((region) => SHORT_CODE_TO_REGION[region])
         .map((region) => (
            <Region
               key={region}
               name={region}
               showName={false}
               customScale={3}
            />
         ));
   }, [deck.regions]);

   return (
      <div
         className="w-72 rounded overflow-hidden shadow-xl h-96 flex flex-col bg-gray-600 hover:bg-gray-400 p-2"
         onClick={() => transition(deck.cardsCode)}
      >
         <div
            className="flex flex-row justify-center items-center"
            style={{ flexBasis: '66%' }}
         >
            {champArtwork}
         </div>
         <div className="px-6 pt-4">
            <div className="font-bold text-xl mb-2 text-center text-gray-100">
               {champs.map((champ) => champ.name).join(' / ')}
            </div>
            <p className="text-sm text-left text-gray-300">
               {`Win Rate: ${(
                  (deck.wins / deck.matchesCollected) *
                  100
               ).toFixed(1)}% | Play Rate: ${(deck.playRate * 100).toFixed(
                  1
               )}%`}
            </p>
         </div>
         <div className="flex flex-row justify-center mt-auto">{regions}</div>
      </div>
   );
}
