import { PlayAroundAction } from "../reducer";
import ManaPicker from "./Mana";

interface Props {
   dispatch: React.Dispatch<PlayAroundAction>;
   manaFilter: number[];
}

export default function Filters({ dispatch, manaFilter }: Props) {
   function onManaClick(val: number) {
      const newFilter = [...manaFilter];

      manaFilter.includes(val)
         ? newFilter.splice(newFilter.indexOf(val), 1)
         : newFilter.push(val);
      dispatch({ type: "SetManaFilter", payload: newFilter });
   }
   return (
      <div
         className="absolute top-0 right-0 flex flex-row gap-3"
         style={{ width: "33vw" }}
      >
         <button onClick={() => dispatch({ type: "DecreaseUserScale" })}>
            -
         </button>
         <button onClick={() => dispatch({ type: "IncreaseUserScale" })}>
            +
         </button>
         <ManaPicker onManaClick={onManaClick} />
      </div>
   );
}
