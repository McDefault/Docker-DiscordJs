const TopGgTask = require('../tasks/stats');
const logger = require("../modules/Logger");

// This event will run once the bot is ready after booting.
module.exports = async (application) => {
    const shardId = application.client.shard.ids[0];
    logger.log(`Shard ${shardId} now ready.`);
    //run topGG task on startup.
    await TopGgTask.run(application);
}