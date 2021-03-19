import { MAXIMUM_SCALE } from "Constants/constants";
import { isOnMobile } from "Helpers/helpers";

export interface PlayAroundState {
   userScale: number;
   manaFilter: number[];
   inCombat: boolean;
   cardList: Record<string, string[]>;
   showRegions: boolean;
}

export type PlayAroundType =
   | "IncreaseUserScale"
   | "DecreaseUserScale"
   | "SetManaFilter"
   | "SetInCombat"
   | "SetCardList"
   | "ToggleRegions";

export interface PlayAroundAction {
   type: PlayAroundType;
   payload?: any;
}

export const INITIAL_STATE: PlayAroundState = {
   userScale: 1,
   manaFilter: [],
   inCombat: false,
   cardList: {},
   showRegions: !isOnMobile(),
};

export function reducer(
   state: PlayAroundState,
   action: PlayAroundAction
): PlayAroundState {
   switch (action.type) {
      case "SetCardList":
         return { ...state, cardList: { ...action.payload } };
      case "SetInCombat":
         return { ...state, inCombat: action.payload };
      case "SetManaFilter":
         return { ...state, manaFilter: [...action.payload] };
      case "IncreaseUserScale":
         return {
            ...state,
            userScale:
               state.userScale >= MAXIMUM_SCALE
                  ? MAXIMUM_SCALE
                  : state.userScale + 0.25,
         };
      case "DecreaseUserScale":
         return {
            ...state,
            userScale: state.userScale <= 0 ? 0 : state.userScale - 0.25,
         };
      case "ToggleRegions":
         return { ...state, showRegions: !state.showRegions };
      default:
         return state;
   }
}
