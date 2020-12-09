const dev = {
  PRODUCTION: false,
  LABEL: 'default',
  API_URL: 'https://api.hycm.com',
};

const prod = {
  PRODUCTION: true,
};

export const env: { [k: string]: any } = Object.assign({}, dev, true ? prod : {});
