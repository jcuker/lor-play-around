import { PlayAroundAction } from "../reducer";
import zoomOut from "@images/zoomOut.svg";
import zoomIn from "@images/zoomIn.svg";
import { MANA_VALUES } from "Constants/constants";
import FilterSection from "./FilterSection";
import { useCallback, useMemo } from "react";

interface Props {
   dispatch: React.Dispatch<PlayAroundAction>;
   manaFilter: number[];
}

export default function FilterContent({ dispatch, manaFilter }: Props) {
   const onManaClick = useCallback(
      (val: number) => {
         const newFilter = [...manaFilter];

         manaFilter.includes(val)
            ? newFilter.splice(newFilter.indexOf(val), 1)
            : newFilter.push(val);

         dispatch({ type: "SetManaFilter", payload: newFilter });
      },
      [dispatch, manaFilter]
   );

   const cardSizeContent = useMemo(() => {
      return (
         <>
            <img
               style={{ height: 48, width: 48 }}
               src={zoomOut}
               onClick={() => dispatch({ type: "DecreaseUserScale" })}
               alt="magnifying glass with minus inscribed"
            />
            <img
               style={{ height: 48, width: 48 }}
               src={zoomIn}
               onClick={() => dispatch({ type: "IncreaseUserScale" })}
               alt="magnifying glass with plus inscribed"
            />
         </>
      );
   }, [dispatch]);

   const manaFilterContent = useMemo(() => {
      return (
         <div
            className="flex flex-row justify-between flex-wrap gap-3"
            style={{ flex: 1 }}
         >
            {Object.keys(MANA_VALUES).map((key: string) => (
               <div
                  className={`flex text-white justify-center items-center opacity-${
                     manaFilter.includes(MANA_VALUES[key]) ? 100 : 50
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
               >
                  {key}
               </div>
            ))}
         </div>
      );
   }, [manaFilter, onManaClick]);

   return (
      <div className="flex flex-col gap-3 m-2">
         <FilterSection content={cardSizeContent} heading="Card Size" />
         <FilterSection content={manaFilterContent} heading="Mana Cost" />
      </div>
   );
}
