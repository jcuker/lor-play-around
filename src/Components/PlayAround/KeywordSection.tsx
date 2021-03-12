import { getKeywordUrl } from "Helpers/helpers";
import Card from "./Card";

interface Props {
   keyword: string;
   cards: any[];
}

export default function KeywordSection({ keyword, cards }: Props) {
   return (
      <div className="flex flex-col items-start">
         <div className="flex flex-row items-center">
            <img
               src={getKeywordUrl(keyword)}
               alt={keyword}
               style={{ height: 48, width: 48, marginRight: 8 }}
            />
            <span className="text-gray-100">{keyword}</span>
         </div>
         <div className="flex flex-row flex-wrap p-12">
            {cards.map((c: any) => (
               <Card key={c.name} art={c.art} name={c.name} />
            ))}
         </div>
      </div>
   );
}
