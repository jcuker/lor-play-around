export const APP_NAME = "LoR Play Around Helper";

export const REGION_TO_SHORT_CODE: Record<string, string> = {
   Bilgewater: "b",
   Demacia: "d",
   Freljord: "f",
   Ionia: "i",
   Noxus: "n",
   "Piltover & Zaun": "pnz",
   "Shadow Isles": "sh",
   Shurima: "s",
   Targon: "t",
};

export const SHORT_CODE_TO_REGION: Record<string, string> = Object.keys(
   REGION_TO_SHORT_CODE
).reduce((ret, key) => {
   //@ts-ignore
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
   ONE: 1,
   TWO: 2,
   THREE: 3,
   FOUR: 4,
   FIVE: 5,
   SIX: 6,
   SEVEN_PLUS: 7,
};

export const MAXIMUM_SCALE = 7;
