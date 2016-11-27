[![Build Status](https://travis-ci.org/munk/openhds-ui.svg?branch=master)](https://travis-ci.org/munk/openhds-ui)

# OpenHDS UI

Data entry interface for the OpenHDS System.

## Usage

### Run the application

    See instructions on the wiki at <https://github.com/munk/openhds-ui/wiki/Deployment>

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
