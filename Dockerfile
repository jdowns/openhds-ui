FROM node:6-onbuild
MAINTAINER munk <munk@protonmail.com>
ADD . /service
COPY server.js /service/server.js
COPY app /service
WORKDIR /service
CMD node server.js

