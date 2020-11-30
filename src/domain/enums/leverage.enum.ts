export enum ELeverage {
  fiveHundred = 500,
  fourHundred = 400,
  threeHundred = 300,
  twoHundred = 200,
  oneHundred = 100,
}

export const leverageMap = new Map<ELeverage, { name: string; value: number }>([
  [ELeverage.fiveHundred, { name: '1:500', value: 500 }],
  [ELeverage.fourHundred, { name: '1:400', value: 400 }],
  [ELeverage.threeHundred, { name: '1:300', value: 300 }],
  [ELeverage.twoHundred, { name: '1:200', value: 200 }],
  [ELeverage.oneHundred, { name: '1:100', value: 100 }],
]);
