const fs = require('fs');
const log = require('./Logger');

const dockerSecret = {};

dockerSecret.read = function read(secretNameAndPath) {
    if (!secretNameAndPath) return false;
    try {
        log.log(`Looking up secret: ${secretNameAndPath}.`);

        return fs.readFileSync(`${secretNameAndPath}`, 'utf8').trim();
    } catch(err) {
        if (err.code !== 'ENOENT') {
            log.error(`An error occurred while trying to read the secret: ${secretNameAndPath}. Err: ${err}`);
        } else {
            log.debug(`Could not find the secret, probably not running in swarm mode: ${secretNameAndPath}. Err: ${err}`);
        }
        return false;
    }
};

module.exports = dockerSecret;