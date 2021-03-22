export interface Card {
   name: string;
   art: string; // url to the art
   code: string;
   speed: string;
   cost: number;
}

export interface DecodedCard {
   code: string;
   count: number;
}
