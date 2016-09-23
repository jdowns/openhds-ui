FROM node:wheezy
MAINTAINER munk <munk@protonmail.com>
ADD . /service
COPY server.js /service/server.js
COPY openhds /service/openhds
WORKDIR /service
CMD ["npm install"]
CMD ["openhds/build.sh"]
CMD ["npm" "start"]
