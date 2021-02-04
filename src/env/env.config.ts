const dev = {
  PRODUCTION: false,
  LABEL: 'default',
  API_URL: 'https://api.hycm.com',
  PROXY_URL: 'https://api.hycm.com',
  GTM_ID: null,
  INTERCOM_ID: null,
  GOOGLE_MAP_KEY: null,
  SENTRY_PUBLIC_DSN: null,
};

const prod = {
  PRODUCTION: true,
};

export const env: { [k: string]: any } = Object.assign({}, dev, true ? prod : {});
