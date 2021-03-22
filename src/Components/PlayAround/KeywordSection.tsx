import { DisplayCard } from "Constants/types";
import { getKeywordUrl } from "Helpers/helpers";
import CardElement from "./CardElement";

interface Props {
   keyword: string;
   cards: DisplayCard[];
   userScale: number;
}

export default function KeywordSection({ keyword, cards, userScale }: Props) {
   return (
      <div className="flex flex-col items-start">
         <div className="flex flex-row items-center ml-4">
            <img
               src={getKeywordUrl(keyword)}
               alt={keyword}
               style={{ height: 48, width: 48, marginRight: 8 }}
            />
            <span className="text-gray-100">{keyword}</span>
         </div>
         <div className="flex flex-row flex-wrap p-12 justify-center sm:justify-start gap-3">
            {cards.map((c: DisplayCard, index: number) => (
               <CardElement
                  key={`${c.name}-${index}`}
                  card={c}
                  userScale={userScale}
               />
            ))}
         </div>
      </div>
   );
}
