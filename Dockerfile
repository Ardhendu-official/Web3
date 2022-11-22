FROM node:16.17.1-buster
# create a directory for the node app
WORKDIR /app


COPY package.json ./

COPY .env ./

COPY . ./


COPY package.json /app
RUN npm install
COPY ./ /app
CMD ["node", "app.js"]