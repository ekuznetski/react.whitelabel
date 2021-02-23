import i18n from '@i18next';
import { config as _config } from '@pages/main/about/About.config';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  pageTopSecondaryImg: (responsive: any) => (responsive.xs ? 'about-page-hands.png' : 'about-page-hands-mobile.png'),
};
