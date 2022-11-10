# create a directory for the node app
WORKDIR /app

# upgrade packages
RUN apt-get update && apt-get upgrade -y
# install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
RUN apt-get update && apt-get install -y nodejs
# install yarn
RUN npm install -g yarn


COPY src/package.json /app
RUN yarn install
COPY src/ /app
CMD ['node', 'app.js']