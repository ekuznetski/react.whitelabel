const dev = {
  PRODUCTION: false,
  LABEL: 'bsfx',
  GTM_ID: 'GTM-KWJHRK9',
  INTERCOM_ID: 'p31288aj',
  API_URL: 'https://api.bluesquarefx.com',
  GOOGLE_MAP_KEY: 'AIzaSyCvXa4VevmTmTayzh4EB4n22Hs769ffr_U',
  SENTRY_PUBLIC_DSN: null,
  // SENTRY_PUBLIC_DSN: 'https://d48f9f100cda4aa5bf9aba50686bed58@sentry.hycm.com/2',
};

const prod = {
  PRODUCTION: true,
};

export const env: { [k: string]: any } = Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
