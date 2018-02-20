"use strict";
require('core-js');
require('reflect-metadata');
require('zone.js/dist/zone');
require('intl');
require('intl/locale-data/jsonp/en');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var pd_service_1 = require('./services/pd.service');
var app_module_1 = require('./app.module');
var config_service_1 = require('./services/config.service');
//enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, [pd_service_1.PdService, config_service_1.Config]);
//# sourceMappingURL=main.js.map