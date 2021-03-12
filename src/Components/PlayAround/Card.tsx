import { getCardScaleFromScreenSize } from "Helpers/helpers";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

interface Props {
   art: string;
   name: string;
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
