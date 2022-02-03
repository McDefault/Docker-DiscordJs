const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const cron = require("node-cron");
const logger = require("../modules/Logger");

class TaskController {
    tasks;

    constructor(application) {
        this.application = application;
        this.logger = logger;
        this.client = application.client;
    }

    async init() {
        this.tasks = {};
        this.loadAllTasks();
    }

    loadTask(taskName) {
        try {
            const task = require(`../tasks/${taskName}`);
            if (! task.conf.enabled) return this.logger.warn(`Task ${taskName}: is disabled.`);
            // this.logger.log(`Loading Task: ${taskName}`);
            if (task.init) {
                this.logger.log(`Initiating Task: ${taskName}`);
                task.init(this.application);
            }

            //to seconds
            if (cron.validate(task.conf.interval)) {

                this.logger.log(`Loading Task: ${taskName}.`);
                cron.schedule(task.conf.interval, () => {
                    task.run(this.application);
                });
            } else {
                return `Unable to load task ${taskName}: Task expression is not valid.`;

            }
        } catch (e) {
            return `Unable to load task ${taskName}: ${e}`;
        }
    };

    // Here we load **commands** into memory, as a collection, so they're accessible
    // here and everywhere else.
    async loadAllTasks() {
        const cmdFiles = await readdir("./src/tasks/");
        this.logger.log(`Loading a total of ${cmdFiles.length} tasks.`);
        cmdFiles.forEach(f => {
            if (!f.endsWith(".js")) return;
            const response = this.loadTask(f);
            if (response) this.logger.error(response);
        });
    }
}
module.exports = TaskController;