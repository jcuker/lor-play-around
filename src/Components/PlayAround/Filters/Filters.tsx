import { PlayAroundAction } from '../reducer';
import FilterContent from './FilterContent';
import SlideMenu from './SlideMenu';

interface Props {
   dispatch: React.Dispatch<PlayAroundAction>;
   manaFilter: number;
   scale: number;
   showFullDeck: boolean;
   showNonCollectibleCards: boolean;
}

export default function Filters({
   dispatch,
   manaFilter,
   scale,
   showFullDeck,
   showNonCollectibleCards,
}: Props) {
   return (
      <SlideMenu
         content={
            <FilterContent
               dispatch={dispatch}
               manaFilter={manaFilter}
               scale={scale}
               showFullDeck={showFullDeck}
               showNonCollectibleCards={showNonCollectibleCards}
            />
         }
      />
   );
}
