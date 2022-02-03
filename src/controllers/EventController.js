const logger = require("../modules/Logger");
const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);

class EventController {
    constructor(application) {
        this.application = application;
        this.logger = logger;
        this.client = application.client;
        this.loadAndBindEvents().catch(e => logger.error(e));
    }
    //load events
    async loadAndBindEvents() {
        const evtFiles = await readdir("./src/events/");
        this.logger.log(`Loading a total of ${evtFiles.length} events.`);
        evtFiles.forEach(file => {
            const eventName = file.split(".")[0];
            this.logger.log(`Loading Event: ${eventName}`);
            const event = require(`../events/${file}`);
            // Bind the client to any event, before the existing arguments
            // provided by the discord.js event.
            // This line is awesome by the way. Just sayin'.
            this.client.on(eventName, event.bind(null, this.application));
        });
    }
}

module.exports = EventController;