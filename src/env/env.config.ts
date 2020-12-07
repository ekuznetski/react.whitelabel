const dev = {
  PRODUCTION: false,
  LABEL: 'default',
};

const prod = {
  PRODUCTION: true,
};

export const env: { [k: string]: any } = Object.assign({}, dev, true ? prod : {});
