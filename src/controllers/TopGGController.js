const Topgg = require('@top-gg/sdk');
const Sleep = require("../modules/sleep");
const logger = require("../modules/Logger");

class TopGGController {

    constructor(app) {
        this.api = new Topgg.Api(app.config.topgg);
    }
    //return promise bool
    hasVoted(id) {
        return this.api.hasVoted(id);
    }

    async postStats(shardId, serverCount, shardCount) {

        let status = true;

        for (let i = 0; status && i <= 3; i++) {
            try {
                const api = this.api;
                await api.postStats({
                    serverCount: serverCount,
                    shardId: shardId,
                    shardCount: shardCount
                });
                await Sleep(2000);
                status = false;
                logger.log(`[TOPGG] Successfully updated TopGG statistics. shard ${shardId} to ${serverCount}`);
            } catch (e) {
                logger.error(`[TOPGG] Failed to send statistics: ${e}.`);
            }
        }
    }
}
module.exports = TopGGController;