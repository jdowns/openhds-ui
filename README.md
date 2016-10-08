[![Build Status](https://travis-ci.org/munk/openhds-ui.svg?branch=master)](https://travis-ci.org/munk/openhds-ui)

# OpenHDS UI

Data entry interface for the OpenHDS System.

## Usage

### Run the application

These instructions assume you have docker available and an instance of
OpenHDS-Rest running and accessible from localhost.

#### Edit app/config.json

    {
      "openhdsRest": "http://<openhds-rest-hostname>:<port>"
    }

#### Build docker container

    $ ls  #  => Dockerfile ...
    $ docker build -t ohdsui .

#### Run docker container

    $ docker run -p 3000:3000 -it ohdsui

The rest application should be available at at localhost:3000

### Starting application for development

#### Start the server

Prior to running the server, run `npm install` in the root and app directories. This will download any required dependencies.

    $ npm start

This will start server.js and serve static files from /app. Changes to the application will be available immediately on page reload.

## Running Tests

### Unit Tests

    $ node_modules/.bin/karma start karma.conf.js --single-run

### Functional Tests

    $ node_modules/.bin/webdriver-manager update
    $ node_modules/.bin/webdriver-manager start
    $ node_modules/.bin/protractor e2e-tests/protractor.conf.js

## License

MIT License

Copyright © 2016 John Downs, Robert Miller
