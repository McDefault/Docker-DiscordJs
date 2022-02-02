const secrets = require('./src/modules/secrets');
const config = {
  "token": secrets.read(process.env.TOKEN_FILE) || process.env.TOKEN,
  "topgg": secrets.read(process.env.TOPGG_FILE) || process.env.TOPGG,
  "restWsBridgeTimeout":parseInt(process.env.restWsBridgeTimeout),
  "restTimeOffset":parseInt(process.env.restTimeOffset),
  "restRequestTimeout":parseInt(process.env.restRequestTimeout),
  "restSweepInterval":parseInt(process.env.restSweepInterval),
  "retryLimit":parseInt(process.env.retryLimit),
  "debug": (parseInt(process.env.DEBUG_MODE) === 1),
};

module.exports = config;
