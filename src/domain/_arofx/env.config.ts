const dev = {
  PRODUCTION: false,
  LABEL: 'arofx',
};

const prod = {
  PRODUCTION: false,
};

export const env: { [k: string]: any } = Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
