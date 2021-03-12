import { SCREEN_BREAKPOINTS } from "Constants/constants";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

interface Props {
   art: string;
   name: string;
}

function getCardScaleFromScreenSize(): number {
   const screenWidth = window.innerWidth;

   if (screenWidth <= SCREEN_BREAKPOINTS.xs) {
      return 6;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.sm) {
      return 4.5;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.md) {
      return 4;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.lg) {
      return 3.5;
   } else if (screenWidth <= SCREEN_BREAKPOINTS.xl) {
      return 3;
   } else {
      return 0;
   }
}

export default function Card({ art, name }: Props) {
   const [scale, setScale] = useState(getCardScaleFromScreenSize());

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
         src={art}
         alt={name}
         style={{ height: 1024 / scale, width: 728 / scale }}
      />
   );
}
