FROM node:wheezy
MAINTAINER munk <munk@protonmail.com>
ADD . /service
COPY server.js /service/server.js
COPY app /service
ORKDIR /service
CMD node server.js

