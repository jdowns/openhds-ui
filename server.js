var express = require('express');
var app = express();

app.use(express.static('app'));

app.listen(3000, function () {
    console.log('OpenHDS UI listening on port 3000!');
});
