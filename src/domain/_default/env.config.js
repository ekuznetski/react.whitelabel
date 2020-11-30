const dev = {
  "PRODUCTION": false,
  "LABEL": "default"
};

const prod = {
  "PRODUCTION": false,
};

export default Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
