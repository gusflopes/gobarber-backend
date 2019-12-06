FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package*.json yarn.* ./

USER node

RUN yarn

# RUN npm install pm2 -g

COPY --chown=node:node . .

EXPOSE 3333

ENTRYPOINT [ "/bin/sh", "./entrypoint.sh" ]
