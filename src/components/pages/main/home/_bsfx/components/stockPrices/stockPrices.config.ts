import { MarketType } from '@domain/enums';
import { config as _config } from '../../../components/stocksPrices/stockPrices.config';

export const config = {
  ..._config,
  leverages: {
    ..._config.leverages,
    [MarketType.forex]: '1:500',
  },
  productsLink: '/range-of-markets',
};
