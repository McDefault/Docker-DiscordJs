# topggstatsupdater
This project provides a microservice that updates your TopGG statistics on a hourly basis. Sharding supported.

This project uses [DiscordJS](https://discord.js.org/#/docs/discord.js/stable/general/welcome) and [TopGG](https://www.npmjs.com/package/@top-gg/sdk)


## Development server

Create file `nodemon.json` from template `nodemon.json.example` and fill in token and topgg environment variables.

Run `npm start` for a dev server. The app will automatically reload if you change any of the source files.

## Build

Run `docker build --rm -t <image> .` to build the Docker project.

## Running the app with Docker

Run `docker run --env TOKEN=<discord_token> --env TOPGG=<topgg_token> <image>` to run the docker image

Make sure to assign the following .env variables
- TOKEN
- TOPGG

## Running the app with Docker Swarm

Create Docker secrets and assign the path to these .env variables
- TOKEN_FILE=/run/secrets/TOKEN_FILE
- TOPGG_FILE=/run/secrets/TOPGG_FILE

## Optional .env variables

`DEBUG_MODE=0`
Specify debug mode on or off.


`restWsBridgeTimeout=5000`
Maximum time permitted between REST responses and their corresponding websocket events - default 5000


`restTimeOffset=500`
Extra time in milliseconds to wait before continuing to make REST requests (higher values will reduce rate-limiting errors on bad connections) - Default 500

`restRequestTimeout=15000`
Time to wait before cancelling a REST request, in milliseconds - Default 15000

`restSweepInterval=60`
How frequently to delete inactive request buckets, in seconds (or 0 for never) - Default 60


`retryLimit=1`
How many times to retry on 5XX errors (Infinity for indefinite amount of retries) - Default 1
