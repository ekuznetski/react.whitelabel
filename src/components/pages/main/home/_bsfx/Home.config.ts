import { config as _config } from '../Home.config';

export const config = {
  ..._config,
  takeControlItems: [
    {
      title: 'Trade With The Metatrader 5 Platform',
      desc: 'The Forex Industry Standard',
      img: 'computer.png',
    },
    {
      title: 'Mobile first',
      desc: 'Get Trading Apps',
      img: 'phone.png',
    },
  ],
  tradeProductsCards: _config.tradeProductsCards.map((product) => {
    if (product.title === 'Cryptocurrencies') {
      return { ...product, exchange: 'BTCUSD, LTCUSD, ETHUSD, XRPUSD' };
    } else {
      return product;
    }
  }),
};
