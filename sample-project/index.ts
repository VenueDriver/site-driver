import path              = require('path');
import favicon           = require('serve-favicon');
import bodyParser        = require('body-parser');
import express           = require('express');
import MD                = require('@molecule-driver/core');
const  app               = express();
const  config            = require('./config/index');

app.use(favicon(path.join(__dirname , './favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit : '1024mb'}));

// views
app.set('view engine' , 'ejs');
app.set('views' , 'views');
app.use(express.static(path.join(__dirname , "./public")));

app.use(MD.assets());
app.use(require('./config/routes'));

app.listen(config.server.port , ()=> console.log(`[:${config.server.port}] Server Running.`));
