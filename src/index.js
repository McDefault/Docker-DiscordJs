
// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.0.0 or higher is required. Update Node on your system.");

const { ShardingManager } = require('discord.js');
const logger = require("./modules/Logger");

const settings =  require("../config.js");

const manager = new ShardingManager('./src/Application.js', { token: settings.token, respawn: false });

manager.spawn({delay: 10000});

// shard.on('disconnect', () => console.log(`[SHARD ] Disconnected`));
// shard.on('error', error => logger.error(`[SHARD] ${error.message}`));
// shard.on('death', process => logger.error(`[SHARD ] Shard ${process.pid} stopped.`));
manager.on('shardCreate', shard => logger.log(`[SHARD MANAGER] Launched shard ${shard.id}`));





