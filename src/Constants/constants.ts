export const APP_NAME = "LoR Play Around Helper";

export const REGION_TO_SHORT_CODE: Record<string, string> = {
   Bilgewater: "b",
   Demacia: "d",
   Freljord: "f",
   Ionia: "i",
   Noxus: "n",
   "Piltover & Zaun": "p",
   "Shadow Isles": "si",
   Shurima: "s",
   Targon: "t",
};

export const SHORT_CODE_TO_REGION: Record<string, string> = Object.keys(
   REGION_TO_SHORT_CODE
).reduce((ret: Record<string, string>, key) => {
   ret[REGION_TO_SHORT_CODE[key]] = key;
   return ret;
}, {});

export const REGIONS = Object.keys(REGION_TO_SHORT_CODE);

export const SCREEN_BREAKPOINTS = {
   xs: 0,
   sm: 600,
   md: 960,
   lg: 1280,
   xl: 1920,
};

export const MANA_VALUES: Record<string, number> = {
   "1": 1,
   "2": 2,
   "3": 3,
   "4": 4,
   "5": 5,
   "6": 6,
   "7+": 7,
};

export const MAXIMUM_SCALE = 2.5;
