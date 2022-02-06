# topggstatsupdater
This is an example application that makes it possible to create a fully Docker supported Discord Bot that runs in shards. You can run this application in multiple ways:
- Local development without Docker
- Local develepment with Docker Compose
- Docker CLI Run
- Run with Docker Compose
- Run with Docker Swarm Stack
- Run all shards in one service
- Spread or split shards over multiple services

You can also create your own Docker image using Docker CLI or Docker compose.

It's all documented in this readme file.

This project provides a microservice that updates your TopGG statistics on an hourly basis. 
Sharding is supported. It's possible to run all shards (one or multiple) on one service or 
make each shard run on its own service 
(see [README](https://github.com/McDefault/topggstatsupdater#split-shards-into-multiple-services)).

This project uses [Docker](https://docs.docker.com/), [DiscordJS](https://discord.js.org/#/docs/discord.js/stable/general/welcome) and [TopGG](https://www.npmjs.com/package/@top-gg/sdk) and more.

## Development server without Docker

Create file `nodemon.json` from template `nodemon.json.example` and fill in the `TOKEN` and `TOPGG` environment variables.

Run `npm start` for a dev server. The app will automatically reload if you change any of the source files.

## Building with Docker CLI

Run `docker build --rm -t <image> .` to build the Docker image for production.

>  **NOTE**:
>
> If you plan on deploying your image to another machine, make sure to push your image to a repo.
> Check out the Docker docs [here](https://docs.docker.com/docker-hub/repos/#pushing-a-docker-container-image-to-docker-hub)
> if you want to use Docker Hub. (recommended)
## Building and running the app with Docker Compose for development

Run `docker-compose build` to build the dev image.

> **NOTE**: 
> 
> You can skip `build` if you plan on using composer `up` to run it, 
> because `up` is setup to automatically build it for you.

Create file `.env` from template `.env.example` and fill in the `TOKEN` and `TOPGG` environment variables.

Run `docker-compose up` to build and run the dev image.

## Running the app with Docker Run

Run `docker run --env TOKEN=<discord_token> --env TOPGG=<topgg_token> <image>` to run the docker image.

Make sure to assign the following .env variables:
- TOKEN
- TOPGG

Make sure to use the same image you used when building your image.

## Building the app with Docker Compose for production

[//]: # (Create file `.env` from template `.env.example` and fill in the `TOKEN` and `TOPGG` environment variables.)

Run `docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml build` to build the docker image for production.

>  **NOTE**:
>
> If you plan on deploying your image to another machine, make sure to push your image to a repo.
> Check out the Docker docs [here](https://docs.docker.com/docker-hub/repos/#pushing-a-docker-container-image-to-docker-hub)
> if you want to use Docker Hub. (recommended)

>  **NOTE**:
>
> **Composer is _not_ meant to run in production.**
> It is only meant for development or building images.
> Make sure to read [Getting started with swarm mode](https://docs.docker.com/engine/swarm/swarm-tutorial/) and check [this](https://github.com/BretFisher/ama/issues/8)
> if you want to use run your build image on a proper environment. (recommended)
## Running the app with Docker Swarm

### Create Swarm stack file

Run `docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml config` to combine base and production compose file.

Suffix with ` > prod.yaml` to output it in a file.

Copy this `prod.yaml` file to your production machine to run your stack on production.

### Creating secrets

On the machine you're planning to run your Swarm stack on do:

Run `echo <discord_token> | docker secret create TOKEN_FILE -` to create `TOKEN` secret.

Run `echo <topgg_token> | docker secret create TOPGG_FILE -` to create `TOPGG` secret.

Make sure to change the following variables without <> to your personal keys:
- discord_token
- topgg_token

>  **NOTE**:
>
> Creating secrets can be done in multiple ways and may differ depending on your OS. 
> Make sure to read the [Docker Documentation](https://docs.docker.com/engine/swarm/secrets/)
> to find the best way on creating a secret in your situation.

Create file `.env` from template `.env.example` and leave `TOKEN_FILE` and `TOPGG_FILE` environment variables as they are.


### Run Swarm stack file

Run `docker stack up -c prod.yaml app --with-registry-auth` to run the stack.

## Split shards into multiple services

By default this app runs all shards on a single service. It can be changed so that every service runs its own separate shard.

This can be done with Swarm and Compose (dev and prod).

Change `.env` file from template `.env.example` and set `SHARD_SPLITTED` to `1` and `TOTAL_SHARDS` to the number of services/shards

Assign the amount of services in the `docker-compose.yaml`, `docker-compose.override.yaml` and `docker-compose.prod.yaml` 
and change the `SHARD_ID` environment in `docker-compose.yaml` accordingly, like in the example. 
The stack in this repo has four shards as example. 

Either remove or add services to decrease or increase the amount of services/shards. 
Each service can only have one shard if splitting is active.

>  **NOTE**:
>
> For your convenience, these following parts are commented out in the codebase, so you only have to remove the comment-symbols to make it work.

Replace `services` from `docker-compose.yaml` to the following:

    services:
      discord-stats-0:
        <<: *discord-bot
        container_name: shard-0
        environment:
          SHARD_ID: 0
      discord-stats-1:
        <<: *discord-bot
        container_name: shard-1
        environment:
          SHARD_ID: 1
      discord-stats-2:
        <<: *discord-bot
        container_name: shard-2
        environment:
          SHARD_ID: 2
      discord-stats-3:
        <<: *discord-bot
        container_name: shard-3
        environment:
          SHARD_ID: 3

### Development

Replace `services` from `docker-compose.override.yaml` if you to apply it on your Docker Compose 
to the following:

    services:
      discord-stats-0:
        <<: *discord-bot
      discord-stats-1:
        <<: *discord-bot
      discord-stats-2:
        <<: *discord-bot
      discord-stats-3:
        <<: *discord-bot

### Production

Replace `services` from `docker-compose.prod.yaml` if you to apply it on your Docker Swarm stack
to the following:

    services:
      discord-stats-0:
        <<: *discord-bot
      discord-stats-1:
        <<: *discord-bot
      discord-stats-2:
        <<: *discord-bot
      discord-stats-3:
        <<: *discord-bot


>  **NOTE**:
> 
> - The amount of services must be equal to `TOTAL_SHARDS` in your `.env` file.
> 
> - Make sure to start `SHARD_ID` from `0` and count up `1` each service.
> 
> - If this is not configured properly, some shards will be skipped. 

Run `docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml config  > prod_splitted.yaml` 
to create a new stack file and copy it to your production similarly done before 
like [here](https://github.com/McDefault/topggstatsupdater#create-swarm-stack-file).

Run `docker stack up -c prod_splitted.yaml app --with-registry-auth` to run the new split stack 
similarly done before
like [here](https://github.com/McDefault/topggstatsupdater#create-swarm-stack-file).

## Optional .env variables

`DEBUG_MODE=0`
Specify debug mode on or off.

`restWsBridgeTimeout=5000`
Maximum time permitted between REST responses and their corresponding websocket events - default 5000.

`restTimeOffset=500`
Extra time in milliseconds to wait before continuing to make REST requests 
(higher values will reduce rate-limiting errors on bad connections) - Default 500.

`restRequestTimeout=15000`
Time to wait before cancelling a REST request, in milliseconds - Default 15000.

`restSweepInterval=60`
How frequently to delete inactive request buckets, in seconds (or 0 for never) - Default 60.

`retryLimit=1`
How many times to retry on 5XX errors (Infinity for indefinite amount of retries) - Default 1.

## Sources

Few resources used:

- https://docs.npmjs.com/cli/v8/commands/npm-install
- https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file
- https://docs.docker.com/compose/compose-file/compose-file-v3/#deploy
- https://docs.docker.com/compose/environment-variables/
- https://docs.docker.com/compose/production/
- https://docs.docker.com/compose/extends/#multiple-compose-files
- https://docs.docker.com/engine/reference/commandline/build/
- https://docs.docker.com/engine/reference/commandline/secret_create/
- https://docs.docker.com/engine/reference/builder/#dockerignore-file
- https://docs.docker.com/compose/compose-file/compose-file-v3/#resources
- https://docs.docker.com/engine/swarm/secrets/
- https://docs.docker.com/docker-hub/repos/
