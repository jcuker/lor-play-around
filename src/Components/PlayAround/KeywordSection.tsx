import { DisplayCard } from 'Constants/types';
import { getKeywordScaleFromScreenSize, getKeywordUrl } from 'Helpers/helpers';
import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import CardElement from './CardElement';

interface Props {
   keyword: string;
   cards: DisplayCard[];
   userScale: number;
}

export default function KeywordSection({ keyword, cards, userScale }: Props) {
   const [scale, setScale] = useState(getKeywordScaleFromScreenSize());

   const updateSize = useCallback(() => {
      const cardScale = getKeywordScaleFromScreenSize();
      setScale(cardScale);
   }, [setScale]);

   useEffect(() => {
      updateSize();
   }, [updateSize]);

   useLayoutEffect(() => {
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
   }, [updateSize]);

   return (
      <div className="flex flex-col items-start">
         <div className="flex flex-row items-center ml-4">
            <img
               src={getKeywordUrl(keyword)}
               alt={keyword}
               style={{ height: 48 / scale, width: 48 / scale, marginRight: 8 }}
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
