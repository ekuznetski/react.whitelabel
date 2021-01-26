export interface IPrices {
  [key: string]: {
    points: string;
    details: {
      name: string;
      bid: number;
      ask: null;
      variation: number;
    };
  };
}
