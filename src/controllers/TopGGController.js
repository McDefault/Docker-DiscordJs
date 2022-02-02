// const Discord = require("discord.js");
const Topgg = require('@top-gg/sdk');
const Sleep = require("../modules/sleep");
const logger = require("../modules/Logger");

class TopGGController {

    constructor(app) {
        this.app = app;
        this.api = new Topgg.Api(app.config.topgg);
    }
    //return promise bool
    hasVoted(id) {
        return this.api.hasVoted(id);
    }

    // <UserId , cacheEntry>
    static async init(token) {
        this.api = new Topgg.Api(token);
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
                console.error(e);
                logger.error(`[TOPGG] Failed to send statistics: ${e}.`);
            }
        }
    }
}
module.exports = TopGGController;