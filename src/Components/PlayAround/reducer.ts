import { MAXIMUM_SCALE, SCALE_STEP } from 'Constants/constants';
import { isOnMobile } from 'Helpers/helpers';

export interface PlayAroundState {
   userScale: number;
   manaFilter: number;
   inCombat: boolean;
   cardList: Record<string, string[]>;
   showRegions: boolean;
   showFullDeck: boolean;
}

export type PlayAroundType =
   | 'IncreaseUserScale'
   | 'DecreaseUserScale'
   | 'SetUserScale'
   | 'SetManaFilter'
   | 'SetInCombat'
   | 'SetCardList'
   | 'ToggleRegions'
   | 'ToggleShowFullDeck';

export interface PlayAroundAction {
   type: PlayAroundType;
   payload?: any;
}

export const INITIAL_STATE: PlayAroundState = {
   userScale: isOnMobile() ? 0.5 : 1,
   inCombat: false,
   manaFilter: 7,
   cardList: {},
   showRegions: !isOnMobile(),
   showFullDeck: false,
};

export function reducer(
   state: PlayAroundState,
   action: PlayAroundAction
): PlayAroundState {
   switch (action.type) {
      case 'SetCardList':
         return { ...state, cardList: { ...action.payload } };
      case 'SetInCombat':
         return { ...state, inCombat: action.payload };
      case 'SetManaFilter':
         return { ...state, manaFilter: action.payload };
      case 'IncreaseUserScale':
         return {
            ...state,
            userScale:
               state.userScale >= MAXIMUM_SCALE
                  ? MAXIMUM_SCALE
                  : state.userScale + SCALE_STEP,
         };
      case 'DecreaseUserScale':
         return {
            ...state,
            userScale: state.userScale <= 0 ? 0 : state.userScale - SCALE_STEP,
         };
      case 'SetUserScale':
         return { ...state, userScale: action.payload };
      case 'ToggleRegions':
         return { ...state, showRegions: !state.showRegions };
      case 'ToggleShowFullDeck':
         return { ...state, showFullDeck: !state.showFullDeck };
      default:
         return state;
   }
}
