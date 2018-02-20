"use strict";
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var express = require('express');
var MD = require('@molecule-driver/core');
var app = express();
var config = require('./config/index');
app.use(favicon(path.join(__dirname, './favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '1024mb' }));
// views
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, "./public")));
app.use(MD.assets());
app.use(require('./config/routes'));
app.listen(config.server.port, function () { return console.log("[:" + config.server.port + "] Server Running."); });
//# sourceMappingURL=index.js.map