import bilgewater from "@images/regions/bilgewater.png";
import demacia from "@images/regions/demacia.png";
import freljord from "@images/regions/freljord.png";
import ionia from "@images/regions/ionia.png";
import noxus from "@images/regions/noxus.png";
import piltoverzaun from "@images/regions/piltoverzaun.png";
import shadowisles from "@images/regions/shadowisles.png";
import shurima from "@images/regions/shurima.png";
import targon from "@images/regions/targon.png";
import { getRegionScaleFromScreenSize } from "Helpers/helpers";
import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useMemo,
   useState,
} from "react";
import checkImg from "@images/check.png";
import "./region.css";

export interface RegionProps {
   name: string;
   onClick?: ({ name, style, onClick }: RegionProps) => void;
   selected?: boolean;
   style?: any;
}
export default function Region({
   name,
   style,
   onClick,
   selected,
}: RegionProps) {
   const [scale, setScale] = useState(getRegionScaleFromScreenSize());

   const updateSize = useCallback(() => {
      const cardScale = getRegionScaleFromScreenSize();
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

   const icon = useMemo(() => {
      switch (name) {
         case "Bilgewater":
            return bilgewater;
         case "Demacia":
            return demacia;
         case "Freljord":
            return freljord;
         case "Ionia":
            return ionia;
         case "Noxus":
            return noxus;
         case "Piltover & Zaun":
            return piltoverzaun;
         case "Shadow Isles":
            return shadowisles;
         case "Shurima":
            return shurima;
         case "Targon":
            return targon;
      }
   }, [name]);

   return (
      <div className="relative flex flex-col items-center">
         <img
            src={icon}
            alt={name}
            className={selected ? "img-selected" : undefined}
            style={{
               margin: 4,
               flex: 0,
               height: 128 / scale,
               width: 128 / scale,
               ...style,
            }}
            onClick={(s) => onClick?.({ name, style })}
         />
         <span className="text-gray-100">{name}</span>
         {selected && (
            <img
               src={checkImg}
               alt="selected"
               style={{
                  height: 24 / scale,
                  width: 24 / scale,
                  position: "absolute",
                  top: 0,
                  right: 0,
               }}
            />
         )}
      </div>
   );
}
