import { ETradingPlatform } from '@domain/enums';

export interface IMarketTableContent {
  instr: string;
  fixed: string;
  classic: string;
  raw: string;
  swap_l: string;
  swap_s: string;
  lotSize: string;
  minTrade: string;
  valuePerTick: string;
  LeverageInfo?: string;
  platform: ETradingPlatform[];
}
