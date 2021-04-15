// This is how the cards are simplified from the LoR API
export interface Card {
   name: string;
   art: string; // url to the art
   code: string;
   speed?: string;
   cost: number;
   isChamp?: boolean;
   subtype: string;
}

// This is used for display purposes to show the number in the top left of a card instead of multiple copies
export interface DisplayCard extends Card {
   count?: number;
}

export interface MobalyticsMetaStatResponse {
   hasNext: boolean;
   decksStats: MetaDeck[];
}

export interface MetaDeck {
   uuid: string;
   rank: number;
   regions: string[];
   title: string;
   playStyle: string;
   playRate: number;
   cardsCode: string;
   matchesCollected: number;
   matchesWin: number;
   wins: number;
   losses: number;
}
