import { PlayAroundAction } from "../reducer";
import zoomOut from "@images/zoomOut.svg";
import zoomIn from "@images/zoomIn.svg";
import { MANA_VALUES, MAXIMUM_SCALE, SCALE_STEP } from "Constants/constants";
import FilterSection from "./FilterSection";
import { useCallback, useMemo } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DeckImporter from "./DeckImporter";
interface Props {
   dispatch: React.Dispatch<PlayAroundAction>;
   manaFilter: number;
   scale: number;
}

export default function FilterContent({ dispatch, manaFilter, scale }: Props) {
   const onManaClick = useCallback(
      (val: number) => {
         dispatch({ type: "SetManaFilter", payload: val });
      },
      [dispatch]
   );

   const cardSizeContent = useMemo(() => {
      return (
         <>
            <img
               style={{ height: "2rem", width: "2rem", filter: "invert(100%)" }}
               src={zoomOut}
               onClick={() => dispatch({ type: "DecreaseUserScale" })}
               alt="magnifying glass with minus inscribed"
            />
            <Slider
               style={{
                  flex: 1,
                  alignSelf: "center",
                  marginLeft: "1rem",
                  marginRight: "1rem",
               }}
               min={0}
               max={MAXIMUM_SCALE}
               step={SCALE_STEP}
               defaultValue={scale}
               value={scale}
               onChange={(value) =>
                  dispatch({ type: "SetUserScale", payload: value })
               }
            />
            <img
               style={{ height: "2rem", width: "2rem", filter: "invert(100%)" }}
               src={zoomIn}
               onClick={() => dispatch({ type: "IncreaseUserScale" })}
               alt="magnifying glass with plus inscribed"
            />
         </>
      );
   }, [dispatch, scale]);

   const manaFilterContent = useMemo(() => {
      return (
         <div
            className={`flex flex-row justify-start md:justify-between flex-wrap gap-3`}
            style={{ flex: 1 }}
         >
            {Object.keys(MANA_VALUES).map((key: string) => (
               <div
                  className={`flex text-white justify-center items-center opacity-${
                     manaFilter === MANA_VALUES[key] ? 100 : 50
                  } hover:opacity-100`}
                  style={{
                     backgroundImage:
                        "linear-gradient(319deg, rgb(0, 212, 255) 15%, rgb(2, 0, 36) 31%, rgb(2, 0, 36) 69%, rgb(0, 212, 255) 75%)",
                     borderRadius: "50%",
                     height: "4vw",
                     minHeight: 27,
                     maxHeight: 64,
                     width: "4vw",
                     minWidth: 27,
                     maxWidth: 64,
                     border: "1px solid rgb(189, 158, 89)",
                     boxShadow:
                        "rgba(20, 11, 36, 0.8) 0px 0px 6px 0px, black 0px 0px 0px 2px inset",
                  }}
                  onClick={() => {
                     onManaClick(MANA_VALUES[key]);
                  }}
                  key={key}
               >
                  {key}
               </div>
            ))}
         </div>
      );
   }, [manaFilter, onManaClick]);

   const tipsContent = useMemo(() => {
      return (
         <span className="text-gray-100">
            Use 1-7 to quickly adjust the mana filter. You can also use '-' or
            '+/=' to adjust the zoom level.
         </span>
      );
   }, []);

   return (
      <div className="flex flex-col gap-3 m-2">
         <FilterSection content={cardSizeContent} heading="Card Size" />
         <FilterSection
            content={manaFilterContent}
            heading="Mana Cost (x or less)"
         />
         <FilterSection
            content={<></>}
            heading="Use 1-7 to quickly adjust the mana filter. You can also use '-' or
            '+/=' to adjust the zoom level."
         />
         {/* <FilterSection
            content={<DeckImporter dispatch={dispatch} />}
            heading="Import Decklist From Code"
         /> */}
      </div>
   );
}
