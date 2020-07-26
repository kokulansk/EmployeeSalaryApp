let express = require('express');
let config = require('config');
let app = express();

const main = require('./app/controllers/main.controller.js');
require('./config/express')(app);
let serverPort = process.env.PORT || config.get('server.port');
app.listen(serverPort, function () {
    console.log('Express server listening on port ' + serverPort);
    main.applicationDidStart();
});