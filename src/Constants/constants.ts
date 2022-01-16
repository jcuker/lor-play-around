import { DisplayCard } from './types';
import cardBack from '../Images/cardback.png';

export const APP_NAME = 'LoR Play Around Helper';

export const REGION_TO_SHORT_CODE: Record<string, string> = {
   'Bandle City': 'bc',
   Bilgewater: 'b',
   Demacia: 'd',
   Freljord: 'f',
   Ionia: 'i',
   Noxus: 'n',
   'Piltover & Zaun': 'p',
   'Shadow Isles': 'si',
   Shurima: 's',
   Targon: 't',
};

export const SHORT_CODE_TO_REGION: Record<string, string> = Object.keys(
   REGION_TO_SHORT_CODE
).reduce((ret: Record<string, string>, key) => {
   ret[REGION_TO_SHORT_CODE[key]] = key;
   return ret;
}, {});

export const REGIONS = Object.keys(REGION_TO_SHORT_CODE);

export const REGION_TO_DECKCODE_ID = {
   DE: 0,
   FR: 1,
   IO: 2,
   NX: 3,
   PZ: 4,
   SI: 5,
   BW: 6,
   MT: 9,
   SH: 7,
   BC: 10
};

export const DECKCODE_REGION_TO_SHORT_CODE: Record<string, string> = {
   DE: 'd',
   FR: 'f',
   IO: 'i',
   NX: 'n',
   PZ: 'p',
   SI: 'si',
   BW: 'b',
   MT: 't',
   SH: 's',
   BC: 'bc'
};

export const SCREEN_BREAKPOINTS = Object.freeze({
   xs: 0,
   sm: 600,
   md: 960,
   lg: 1280,
   xl: 1920,
});

export const MANA_VALUES: Record<string, number> = {
   '1': 1,
   '2': 2,
   '3': 3,
   '4': 4,
   '5': 5,
   '6': 6,
   '7+': 7,
};

export const MAXIMUM_SCALE = 3;
export const SCALE_STEP = 0.25;

export const NO_CHAMP: DisplayCard = {
   isChamp: true,
   name: 'No Champ',
   art: cardBack,
   code: '',
   cost: 0,
   subtypes: [],
};
