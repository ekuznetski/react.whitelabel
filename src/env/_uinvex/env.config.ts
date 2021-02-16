const dev = {
  PRODUCTION: false,
  DEV_MODE: true,
  LABEL: 'uinvex',
  API_URL: 'https://api.bluesquarefx.com',
  // PROXY_URL: 'http://localhost:4201/proxy', // for local SSR testing
  PROXY_URL: 'http://3.8.91.193:3000/proxy',
  PRICES_URL: 'https://prices.bluesquarefx.com',
  GTM_ID: '',
  INTERCOM_ID: '',
  GOOGLE_MAP_KEY: '',
  SENTRY_PUBLIC_DSN: '',
};

const prod = {
  PRODUCTION: true,
  DEV_MODE: false,
  PROXY_URL: 'http://3.8.91.193:3000/proxy',
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
