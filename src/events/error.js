const logger = require("../modules/Logger");

module.exports = async (client, error) => {
  logger.error(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
