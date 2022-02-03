const logger = require("../modules/Logger");

exports.run = async (application) => {
    if (application.config.topgg === "None") return;

    logger.log("[TOPGG] Attempting to update TopGG statistics.");
    const shardId = application.client.shard.ids[0];
    const serverCount = application.client.guilds.cache.size;
    const shardCount = application.client.shard.count;
    await application.topGgController.postStats(shardId, serverCount, shardCount);
};
//0 0 */1 * * * elk uur
//*/15 * * * * * elke 15 sec

exports.conf = {
    enabled: true,
    configurable: false,
    interval:`0 0 */1 * * *`,
    // interval:`*/15 * * * * *`,
};

exports.help = {
    name: "stats",
    category: "Process",
    description: "Task that sends statistics to TopGG."
};
