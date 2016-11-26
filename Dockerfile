FROM node:4-onbuild
MAINTAINER munk <munk@protonmail.com>
ADD . /service
COPY server.js /service/server.js
COPY app /service
WORKDIR /service
RUN npm --prefix ./app install ./app
RUN npm install express
CMD node server.js

