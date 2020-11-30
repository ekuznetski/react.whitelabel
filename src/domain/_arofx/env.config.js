const dev = {
  "PRODUCTION": false,
  "LABEL": "arofx"
};

const prod = {
  "PRODUCTION": false,
};

export default Object.assign({}, dev, process.env.PRODUCTION ? prod : {});
