import { ETradingPlatform } from '@domain/enums';

export const downloadLinks = {
  [ETradingPlatform.mt5]: {
    desktop: 'https://download.mql5.com/cdn/web/17115/mt5/bluesquare5setup.exe',
    appStore: 'https://apps.apple.com/us/app/metatrader-5/id413251709',
    googlePlay: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en_US&gl=US',
  },
};
