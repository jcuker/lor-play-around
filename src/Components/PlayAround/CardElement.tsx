import { getCardScaleFromScreenSize } from "Helpers/helpers";
import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from "react";
import cardBack from "@images/cardBack.png";
import { DisplayCard } from "Constants/types";

interface Props {
   card: DisplayCard;
   userScale: number;
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
                  rootMargin: "75%",
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
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
   }, [updateSize]);

   return (
      <div className="relative">
         <img
            ref={imgRef}
            src={src}
            alt={card.name}
            height={1024 / (scale - userScale)}
            width={728 / (scale - userScale)}
            style={{
               height: 1024 / (scale - userScale),
               width: 728 / (scale - userScale),
            }}
         />
         <div className="absolute top-0 right-0 text-gray-100">
            {card.count}
         </div>
      </div>
   );
}
