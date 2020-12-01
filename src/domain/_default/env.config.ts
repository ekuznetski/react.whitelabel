const dev = {
  PRODUCTION: false,
  LABEL: 'default',
};

const prod = {
  PRODUCTION: false,
};

export const env: { [k: string]: any } = Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
