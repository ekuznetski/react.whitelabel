const dev = {
  PRODUCTION: false,
  LABEL: 'default',
  SITE_URL: 'https://www.hycm.eu',
  API_URL: 'https://api.hycm.com',
};

const prod = {
  PRODUCTION: true,
};

export const env: { [k: string]: any } = Object.assign({}, dev, true ? prod : {});
