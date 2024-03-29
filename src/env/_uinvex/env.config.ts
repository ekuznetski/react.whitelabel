const dev = {
  PRODUCTION: false,
  DEV_MODE: true,
  LABEL: 'uinvex',
  API_URL: 'https://api.uinvex.com',
  // PROXY_URL: 'http://localhost:4201/proxy', // for local SSR testing
  PROXY_URL: 'https://www.uinvex.com/proxy',
  PRICES_URL: 'https://prices.bluesquarefx.com',
  GTM_ID: 'GTM-KPLVHNW',
  INTERCOM_ID: '',
  GOOGLE_MAP_KEY: 'AIzaSyC4Imq2uw0xAsCISIqxBCGvhxh9aXv85XQ',
  SENTRY_PUBLIC_DSN: '',
};

const prod = {
  PRODUCTION: true,
  DEV_MODE: false,
  PROXY_URL: 'https://www.uinvex.com/proxy',
};

const prod_dev = {
  PRODUCTION: true,
  DEV_MODE: true,
};

export const env: { [k: string]: any } = Object.assign(
  {},
  dev,
  process.env.PRODUCTION ? (process.env.DEV_MODE ? prod_dev : prod) : {},
);
