import { getCardScaleFromScreenSize } from "Helpers/helpers";
import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from "react";
import cardback from "@images/cardback.png";
interface Props {
   art: string;
   name: string;
}

export default function Card({ art, name }: Props) {
   const [scale, setScale] = useState(getCardScaleFromScreenSize());
   const [src, setSrc] = useState(cardback);
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
                        setSrc(art);
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
            setSrc(art);
         }
      }

      return () => {
         didCancel = true;
         // on component unmount, we remove the listner
         if (element.current && observer && observer.unobserve) {
            observer.unobserve(element.current as Element);
         }
      };
   }, [art]);

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
      <img
         ref={imgRef}
         src={src}
         alt={name}
         style={{ height: 1024 / scale, width: 728 / scale }}
      />
   );
}
