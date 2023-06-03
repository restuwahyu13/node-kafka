FROM node:14-alpine
USER ${USER}
WORKDIR /usr/src/app
COPY package*.json ./
COPY . ./
RUN npm install --silent