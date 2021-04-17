import metadata from '../Constants/metadata.json';
import card from '@images/card.svg';
import {
   DECKCODE_REGION_TO_SHORT_CODE,
   REGIONS,
   SCREEN_BREAKPOINTS,
   SHORT_CODE_TO_REGION,
} from 'Constants/constants';
import { Card, DisplayCard } from 'Constants/types';
import { getDeckFromCode, CardCodeAndCount, Deck } from 'lor-deckcodes-ts';

const cardsByRegion = metadata as Record<string, DisplayCard[]>;

export function getCardsForRegion(region: string) {
   return cardsByRegion[region];
}

export function filterCardsForRegionByList(
   region: string,
   list: string[],
   decodedCards?: Deck
): DisplayCard[] {
   let cards = getCardsForRegion(region).filter(
      (card: DisplayCard) =>
         list.includes(card.name) || list.includes(card.code)
   );

   if (decodedCards) {
      cards = cards.filter(
         (card: Card) =>
            !!decodedCards.find(
               (decoded: CardCodeAndCount) => decoded.cardCode === card.code
            )
      );
   }

   return cards;
}

export function getKeywordUrl(keyword: string) {
   return keyword === 'Unit / Landmark'
      ? card
      : process.env.REACT_APP_KEYWORDS_CDN + keyword + '.svg';
}

export function getCardScaleFromScreenSize(): number {
   const values: Record<ScreenBreakpointKeys, number> = {
      xl: 4.75,
      lg: 5.25,
      md: 6,
      sm: 6.75,
      xs: 7.5,
   };
   return getScaleHelper(values);
}

export function getRegionScaleFromScreenSize(): number {
   const values: Record<ScreenBreakpointKeys, number> = {
      xl: 1,
      lg: 1.5,
      md: 2,
      sm: 2.5,
      xs: 3,
   };
   return getScaleHelper(values);
}

export function getKeywordScaleFromScreenSize(): number {
   const values: Record<ScreenBreakpointKeys, number> = {
      xl: 1,
      lg: 1.25,
      md: 1.5,
      sm: 1.75,
      xs: 2,
   };
   return getScaleHelper(values);
}

type ScreenBreakpointKeys = keyof typeof SCREEN_BREAKPOINTS;
function getScaleHelper(
   values: Record<ScreenBreakpointKeys, number>,
   screenWidth = window.innerWidth
): number {
   if (screenWidth <= SCREEN_BREAKPOINTS.xs) {
      return values['xs'];
   } else if (screenWidth <= SCREEN_BREAKPOINTS.sm) {
      return values['sm'];
   } else if (screenWidth <= SCREEN_BREAKPOINTS.md) {
      return values['md'];
   } else if (screenWidth <= SCREEN_BREAKPOINTS.lg) {
      return values['lg'];
   } else if (screenWidth <= SCREEN_BREAKPOINTS.xl) {
      return values['xl'];
   } else {
      return 0;
   }
}

export function isSmallScreen(): boolean {
   const screenWidth = window.innerWidth;
   return screenWidth < SCREEN_BREAKPOINTS.md;
}

export function getRegionFromCardCode(code: string, shortCode: boolean = true) {
   const regionStr = code.substring(2, 4);
   const asShortCode = DECKCODE_REGION_TO_SHORT_CODE[regionStr];
   return shortCode ? asShortCode : SHORT_CODE_TO_REGION[asShortCode];
}

export function isOnMobile(): boolean {
   return (function (a) {
      return (
         /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
         ) ||
         // eslint-disable-next-line no-useless-escape
         /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
         )
      );
   })(navigator.userAgent || navigator.vendor || (window as any).opera);
}

export function decodeDeck(code: string): Deck {
   let decodedDeck: Deck = [];

   try {
      decodedDeck = getDeckFromCode(code);
   } catch (e) {
      console.warn('invalid deck code');
   }

   if (decodedDeck.length === 0) {
      console.info('Deck was empty. Was this expected?');
   }

   return decodedDeck;
}

export function decodeDeckCodeToCardList({
   code,
   decoded,
}: {
   code?: string;
   decoded?: Deck;
}) {
   const decodedDeck = code ? decodeDeck(code) : decoded;

   if (!decodedDeck) return {};

   const decodedToList = decodedDeck.reduce(
      (acc: Record<string, string[]>, curr: CardCodeAndCount) => {
         const region =
            SHORT_CODE_TO_REGION[getRegionFromCardCode(curr.cardCode)];

         const newVal = { ...acc };

         if (!Array.isArray(newVal[region])) newVal[region] = [];

         newVal[region].push(curr.cardCode);

         return newVal;
      },

      {}
   );

   return decodedToList;
}

function convertDecodedCardToDisplayCard(card: CardCodeAndCount): DisplayCard {
   const region = getRegionFromCardCode(card.cardCode, false);
   const found = getCardsForRegion(region).find(
      (val: Card) => card.cardCode === val.code
   );

   return { ...found, count: card.count } as DisplayCard;
}

export function convertDecodedCardsToDisplayCards(decodedCards: Deck = []) {
   const uniq = new Set<DisplayCard>();
   decodedCards
      .map(convertDecodedCardToDisplayCard)
      .forEach((c) => uniq.add(c));
   return Array.from(uniq);
}

export function getChampsFromDeck(code: string): DisplayCard[] {
   const decoded = decodeDeck(code);

   const champs = decoded
      .map((dCard: CardCodeAndCount) => {
         const region = getRegionFromCardCode(dCard.cardCode, false);
         return getCardsForRegion(region).find(
            (card: DisplayCard) => card.code === dCard.cardCode
         ) as DisplayCard;
      })
      .filter((card) => card.isChamp)
      .sort((a, b) => (a.name > b.name ? 1 : -1));

   return champs as DisplayCard[];
}

export interface GetCardsCriteria {
   region?: string;
   subtype?: string;
   cost?: number;
}

export function getCardsByCriteria({
   cost,
   region,
   subtype,
}: GetCardsCriteria): DisplayCard[] {
   if (region) {
      return getCardsForRegion(region);
   }

   let allCards: DisplayCard[] = [];
   for (const r of REGIONS) {
      allCards = allCards.concat(getCardsForRegion(r));
   }

   if (cost) {
      return allCards.filter((card) => card.cost === cost);
   } else if (subtype) {
      return allCards.filter(
         (card) => card.subtype.toLowerCase() === subtype.toLowerCase()
      );
   }

   return allCards;
}
