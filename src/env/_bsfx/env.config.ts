const dev = {
  PRODUCTION: false,
  LABEL: 'bsfx',
  GTM_ID: 'GTM-KWJHRK9',
  INTERCOM_ID: 'p31288aj',
  SITE_URL: 'http://localhost:4200',
  API_URL: 'https://api.bluesquarefx.com',
};

const prod = {
  PRODUCTION: true,
  SITE_URL: 'https://www.bluesquarefx.com',
};

export const env: { [k: string]: any } = Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
