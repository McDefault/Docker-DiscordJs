# topggstatsupdater
This project provides a microservice that updates your TopGG statistics on a hourly basis. Sharding supported.

This project uses [DiscordJS](https://discord.js.org/#/docs/discord.js/stable/general/welcome) and [TopGG](https://www.npmjs.com/package/@top-gg/sdk)


## Development server

Create file `nodemon.json` from template `nodemon.json.example` and fill in token and topgg environment variables.

Run `npm start` for a dev server. The app will automatically reload if you change any of the source files.

## Building with Docker CLI

Run `docker build --rm -t <image> .` to build the Docker project.

## Building with Docker compose

Run `docker-compose build` to build the Docker project

## Running the app with Docker Run

Run `docker run --env TOKEN=<discord_token> --env TOPGG=<topgg_token> <image>` to run the docker image

Make sure to assign the following .env variables
- TOKEN
- TOPGG

## Running the app with Docker Compose

Create file `.env` from template `.env.example` and fill in token and topgg environment variables.

Run `docker-compose up` to run the docker image

## Running the app with Docker Swarm

Run `echo <discord_token> | docker secret create TOKEN_FILE -` to create TOKEN secret

Run `echo <topgg_token> | docker secret create TOPGG_FILE -` to create TOPGG secret

Create file `.env` from template `.env.example` and leave token and topgg environment variables as they are.

Run `docker stack up -c docker-compose.yaml app --with-registry-auth` to run the stack

## Split shards into multiple services

This can be done with Swarm and Compose

Create file `.env` from template `.env.example` and change `SHARD_SPLITTED` to `1` and `TOTAL_SHARDS` to the number of services/shards

Assign the amount of services in the `docker-compose.yaml` and change the `SHARD_ID` accordingly. The stack in this repo has four shards as example. 

Either remove or add servives to decrease or increase the amount of services/shards. Each service can only have one shard if splitting is active.


      services:
        discord-bot-stats-0:
          <<: *discord-bot
          container_name: shard-0
          environment:
            SHARD_ID: 0

>  ***NOTE: The amount of services must be equal to `TOTAL_SHARDS` in your .env file.***

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
