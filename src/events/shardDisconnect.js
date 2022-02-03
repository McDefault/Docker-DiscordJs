const logger = require("../modules/Logger");

// This event will run when the shard disconnects and does not reconnect.
// Gracefully close the application and let docker reconnect.
module.exports = async (application, error, id) => {
  logger.error(`[SHARD_MANAGER] stopping shard [${id}]`);
  process.exit(1);
};