const logger = require("./modules/Logger");
const {Client, Intents} = require("discord.js");
const TaskController = require("./controllers/TaskController");
const TopGGController = require('./controllers/TopGGController');
const EventController = require('./controllers/EventController');
//Application is called by index.js - the number of instances depends on the number of shards.
class Application {
    static async init() {
        this.config = require("../config.js");

        this.client = new Client({
            restWsBridgeTimeout: this.config.restWsBridgeTimeout,
            restTimeOffset: this.config.restTimeOffset,
            restRequestTimeout: this.config.restRequestTimeout,
            restSweepInterval: this.config.restSweepInterval,
            retryLimit: this.config.retryLimit,
            intents: [
                Intents.FLAGS.GUILDS,
            ]
        });

        this.topGgController = new TopGGController(Application);
        this.eventController = new EventController(Application);
        this.taskController = new TaskController(Application);
        await this.taskController.init();

        await this.client.login(this.config.token).catch(e => logger.error(e.message));
    };
}

Application.init();

// These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    logger.error(`Uncaught Exception: ${errorMsg}`);
    console.error(err);
    // Always best practice to let the code crash on uncaught exceptions.
    // Because you should be catching them anyway.
    process.exit(1);
});

process.on("unhandledRejection", err => {
    logger.error(`Unhandled rejection: ${err}`);
    console.error(err);
});