FROM node:wheezy
MAINTAINER munk <munk@protonmail.com>
ADD . /service
COPY server.js /service/server.js
COPY app /service
WORKDIR /service
RUN npm install
RUN npm install express
CMD node server.js

