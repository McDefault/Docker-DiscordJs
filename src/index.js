// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.0.0 or higher is required. Update Node on your system.");
const { ShardingManager } = require('discord.js');
const logger = require("./modules/Logger");
const settings = require("../config.js");
const ShardManagerOptionsController = require('./controllers/ShardManagerOptionsController');

const managerOptions = ShardManagerOptionsController.options(settings);
const manager = new ShardingManager('./src/Application.js', managerOptions);

manager.spawn({timeout: 60000, delay: 2500}).catch(e => logger.error(e));
manager.on('shardCreate', shard => logger.log(`[SHARD MANAGER] Launched shard ${shard.id}`));





