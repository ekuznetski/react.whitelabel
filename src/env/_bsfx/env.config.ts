const dev = {
  PRODUCTION: false,
  DEV_MODE: true,
  LABEL: 'bsfx',
  GTM_ID: 'GTM-KWJHRK9',
  INTERCOM_ID: 'p31288aj',
  API_URL: 'https://api.bluesquarefx.com',
  PROXY_URL: 'http://localhost:4201/proxy',
  GOOGLE_MAP_KEY: 'AIzaSyDOyshXiJCVtAmFMAHfRqR_9sfNRhNJm3k',
  SENTRY_PUBLIC_DSN: 'https://6fe4ef1e5cb34971a4f9fd7d1dd1ba6d@sentry.hycm.com/6',
};

const prod = {
  PRODUCTION: true,
  DEV_MODE: false,
  PROXY_URL: 'https://bluesquarefx.com/proxy',
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
