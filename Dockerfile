FROM node:16-alpine
# Setup Work directory.
WORKDIR /usr/src/bot
COPY package.json ./

# Let's install everything!
RUN apk add --update \
    && apk add --no-cache --virtual .build git curl build-base g++ \
    && npm install \
    && apk del .build

# add custom config settings
#Your Bot's Token. Available on https://discordapp.com/developers/applications/me . Default McDebugs Token
ENV TOKEN=tokentemplatehere
#Your TOPGG Token. Available on https://top.gg/bot/<topgg_id>/webhooks Default none.
ENV TOPGG=tokentemplatehere
#Specify debug mode on or off.
ENV DEBUG_MODE=0
#Maximum time permitted between REST responses and their corresponding websocket events - default 5000
ENV restWsBridgeTimeout=5000
#Extra time in milliseconds to wait before continuing to make REST requests (higher values will reduce rate-limiting errors on bad connections) - Default 500
ENV restTimeOffset=500
#Time to wait before cancelling a REST request, in milliseconds - Default 15000
ENV restRequestTimeout=15000
#How frequently to delete inactive request buckets, in seconds (or 0 for never) - Default 60
ENV restSweepInterval=60
#How many times to retry on 5XX errors (Infinity for indefinite amount of retries) - Default 1
ENV retryLimit=1

# Copy project to our WORKDIR
COPY . .

# Let's run it!
CMD [ "node", "--max_old_space_size=450", "src/index.js" ]