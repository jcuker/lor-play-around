import { MAXIMUM_SCALE } from "Constants/constants";

export interface PlayAroundState {
   userScale: number;
   manaFilter: number[];
   inCombat: boolean;
   cardList: Record<string, string[]>;
}

export type PlayAroundType =
   | "IncreaseUserScale"
   | "DecreaseUserScale"
   | "SetManaFilter"
   | "SetInCombat"
   | "SetCardList";

export interface PlayAroundAction {
   type: PlayAroundType;
   payload?: any;
}

export const INITIAL_STATE: PlayAroundState = {
   userScale: 1,
   manaFilter: [],
   inCombat: false,
   cardList: {},
};

export function reducer(
   state: PlayAroundState,
   action: PlayAroundAction
): PlayAroundState {
   console.log(action);
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
                  : state.userScale + 1,
         };
      case "DecreaseUserScale":
         return {
            ...state,
            userScale: state.userScale <= 0 ? 0 : state.userScale - 1,
         };
      default:
         return state;
   }
}
