import bandleCity from '../../Images/regions/BC.svg';
import bilgewater from '../../Images/regions/bilgewater.png';
import demacia from '../../Images/regions/demacia.png';
import freljord from '../../Images/regions/freljord.png';
import ionia from '../../Images/regions/ionia.png';
import noxus from '../../Images/regions/noxus.png';
import piltoverzaun from '../../Images/regions/piltoverzaun.png';
import shadowisles from '../../Images/regions/shadowisles.png';
import shurima from '../../Images/regions/shurima.png';
import targon from '../../Images/regions/targon.png';
import { getRegionScaleFromScreenSize } from 'Helpers/helpers';
import {
   useCallback,
   useEffect,
   useLayoutEffect,
   useMemo,
   useState,
} from 'react';
import checkImg from '../../Images/check.png';
import './region.css';

export interface RegionProps {
   name: string;
   onClick?: ({ name, style, onClick }: RegionProps) => void;
   selected?: boolean;
   style?: any;
   customScale?: number;
   showName?: boolean;
}
export default function Region({
   name,
   style,
   onClick,
   showName = true,
   customScale,
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
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
   }, [updateSize]);

   const icon = useMemo(() => {
      switch (name) {
         case 'Bandle City':
            return bandleCity;
         case 'Bilgewater':
            return bilgewater;
         case 'Demacia':
            return demacia;
         case 'Freljord':
            return freljord;
         case 'Ionia':
            return ionia;
         case 'Noxus':
            return noxus;
         case 'Piltover & Zaun':
            return piltoverzaun;
         case 'Shadow Isles':
            return shadowisles;
         case 'Shurima':
            return shurima;
         case 'Targon':
            return targon;
         default:
            console.log(`Unable to match region: ${name}`);
      }
   }, [name]);

   const height = customScale ? 128 / customScale : 128 / scale;
   const width = customScale ? 128 / customScale : 128 / scale;

   return (
      <div className="relative flex flex-col items-center">
         <img
            src={icon}
            alt={name}
            className={selected ? 'img-selected' : undefined}
            style={{
               margin: 4,
               flex: 0,
               height,
               width,
               ...style,
            }}
            onClick={(s) => onClick?.({ name, style })}
         />
         {showName && <span className="text-gray-100">{name}</span>}
         {selected && (
            <img
               src={checkImg}
               alt="selected"
               style={{
                  height: height / 5.333,
                  width: width / 5.333,
                  position: 'absolute',
                  top: 0,
                  right: 0,
               }}
            />
         )}
      </div>
   );
}
