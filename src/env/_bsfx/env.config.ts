const dev = {
  PRODUCTION: false,
  LABEL: 'bsfx',
  GTM_ID: 'GTM-KWJHRK9',
  INTERCOM_ID: 'p31288aj',
  API_URL: 'https://api.bluesquarefx.com',
  GOOGLE_MAP_KEY: 'AIzaSyCvXa4VevmTmTayzh4EB4n22Hs769ffr_U',
  SENTRY_PUBLIC_DSN: 'https://6fe4ef1e5cb34971a4f9fd7d1dd1ba6d@sentry.hycm.com/6',
};

const prod = {
  PRODUCTION: true,
};

export const env: { [k: string]: any } = Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
