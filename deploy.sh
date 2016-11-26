#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

restServer='http://bhd.rcg.usm.maine.edu:8080'

echo "Enter rest server url, including http:// and port number (default: $restServer)"
read userEnteredRestServer

if [ -z ${userEnteredRestServer//\n} ]; then echo "using default: $restServer"; else restServer=$userEnteredRestServer; fi

echo "{ \"openhdsRest\": \"$restServer\" }" > 'app/config.json'

rm -rf node_modules app/node_modules
docker build -t ohdsui .

echo "You may now run the container with the following command:"
echo "    docker run -p 8081:3000 -it ohdsui"
