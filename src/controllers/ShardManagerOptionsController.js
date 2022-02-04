const ShardManagerOptionsController = {};

ShardManagerOptionsController.options = function read(settings) {
    if (settings.shardSplitted === 0) { //this allows you to run all shards (one or multiple) on one service
        return { token: settings.token, respawn: false }
    }
    else { // this allows your to run different shards on different services. Do this only with a large amount of shards
        return { token: settings.token, totalShards: settings.totalShards, shardList: [settings.shardId], respawn: false }
    }
};

module.exports = ShardManagerOptionsController;