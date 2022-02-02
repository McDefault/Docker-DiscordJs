
/*
Logger class for easy and aesthetically pleasing console logging
*/
module.exports.log = (content, type = "log") => {
  const logger = require('pino')();
  const timestamp = ``;
  switch (type) {
    case "log":
    case "warn":
    case "error":
    case "debug":
    case "cmd":
    case "ready": {
      break;
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
  return logger.info(`${timestamp} ${type.toUpperCase()} ${content} `);

};

module.exports.error = (...args) => this.log(...args, "error");

module.exports.warn = (...args) => this.log(...args, "warn");

module.exports.debug = (...args) => this.log(...args, "debug");

module.exports.cmd = (...args) => this.log(...args, "cmd");
