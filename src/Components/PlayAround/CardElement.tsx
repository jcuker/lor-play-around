import { getCardScaleFromScreenSize } from 'Helpers/helpers';
import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from 'react';
import cardBack from '@images/cardBack.png';
import { DisplayCard } from 'Constants/types';

interface Props {
   card: DisplayCard;
   userScale: number;
}

function CardCount({ count }: { count: number }) {
   const filledColor = 'rgb(198, 169, 35)';
   const emptyColor = 'rgba(2,0,36,1)';

   function fillCardCount() {
      let jsx = [];

      for (let i = 0; i < 3; i++) {
         jsx.push(
            <div
               key={`copy-${i}`}
               style={{
                  borderRadius: '50%',
                  backgroundImage: `radial-gradient(circle, ${
                     i < count ? filledColor : emptyColor
                  } 27%, rgba(172,179,64,1) 104%)`,
                  height: '1rem',
                  width: '1rem',
               }}
            ></div>
         );
      }

      // To support non-standard decks with more than 3 copies of a card
      if (count > 3) {
         jsx.push(
            <span key={`copy-4`} className="text-gray-100 text-sm">
               +{count - 3}
            </span>
         );
      }

      return jsx;
   }

   return (
      <div
         style={{
            width: '100%',
            padding: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            gap: 3,
         }}
      >
         {fillCardCount()}
      </div>
   );
}

export default function CardElement({ card, userScale }: Props) {
   const [scale, setScale] = useState(getCardScaleFromScreenSize());
   const [src, setSrc] = useState(cardBack);
   const imgRef = useRef<HTMLImageElement>(null);

   useEffect(() => {
      let observer: IntersectionObserver;
      let didCancel = false;
      const element = imgRef;

      if (element.current) {
         if (IntersectionObserver) {
            observer = new IntersectionObserver(
               (entries) => {
                  entries.forEach((entry) => {
                     // when image is visible in the viewport + rootMargin
                     if (
                        !didCancel &&
                        (entry.intersectionRatio > 0 || entry.isIntersecting)
                     ) {
                        setSrc(card.art);
                     }
                  });
               },
               {
                  threshold: 0.01,
                  rootMargin: '75%',
               }
            );
            observer.observe(element.current);
         } else {
            // Old browsers fallback
            setSrc(card.art);
         }
      }

      return () => {
         didCancel = true;
         if (element.current && observer && observer.unobserve) {
            observer.unobserve(element.current as Element);
         }
      };
   }, [card.art]);

   const updateSize = useCallback(() => {
      const cardScale = getCardScaleFromScreenSize();
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
      <div className="relative">
         <img
            ref={imgRef}
            src={src}
            alt={card.name}
            id={card.name}
            height={1024 / (scale - userScale)}
            width={728 / (scale - userScale)}
            style={{
               height: 1024 / (scale - userScale),
               width: 728 / (scale - userScale),
            }}
         />
         {card.count && <CardCount count={card.count} />}
      </div>
   );
}
