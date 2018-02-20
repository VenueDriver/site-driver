"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
require("reflect-metadata");
require("zone.js/dist/zone");
require("intl");
require("intl/locale-data/jsonp/en");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var app_module_1 = require("./app.module");
var pd_service_1 = require("./services/pd.service");
var config_service_1 = require("./services/config.service");
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, [pd_service_1.PdService, config_service_1.Config]);
//# sourceMappingURL=main.js.map