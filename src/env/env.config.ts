const dev = {
  PRODUCTION: false,
  LABEL: 'default',
  SITE_URL: 'http://localhost:4200',
  API_URL: 'https://api.hycm.com',
};

const prod = {
  PRODUCTION: true,
  SITE_URL: 'https://www.hycm.eu',
};

export const env: { [k: string]: any } = Object.assign({}, dev, true ? prod : {});
