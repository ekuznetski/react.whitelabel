const dev = {
  PRODUCTION: false,
  LABEL: 'bsfx',
  GTM_ID: 'GTM-KWJHRK9',
  INTERCOM_ID: 'p31288aj',
};

const prod = {
  PRODUCTION: false,
};

export const env: { [k: string]: any } = Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
