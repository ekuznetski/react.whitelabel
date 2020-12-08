import i18n from 'i18next';
import { config as _config } from '@pages/main/platform/Platform.config';
const t = i18n.getFixedT(i18n.language);

export const config = {
  ..._config,
  downloadLinks: {
    desktopLink: 'https://download.mql5.com/cdn/web/17115/mt5/bluesquare5setup.exe',
    appStoreLink: 'https://apps.apple.com/us/app/metatrader-5/id413251709',
    googlePlayLink: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en_US&gl=US',
  },
};
