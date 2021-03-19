import { PlayAroundAction } from "../reducer";
import FilterContent from "./FilterContent";
import SlideMenu from "./SlideMenu";

interface Props {
   dispatch: React.Dispatch<PlayAroundAction>;
   manaFilter: number[];
}

export default function Filters({ dispatch, manaFilter }: Props) {
   return (
      <SlideMenu
         content={<FilterContent dispatch={dispatch} manaFilter={manaFilter} />}
      />
   );
}
