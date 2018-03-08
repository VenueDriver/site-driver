"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteInjector = require("./index");
var routeMap = new RouteInjector();
console.log("Init");
routeMap.buildFront().then(function () {
    console.log("ending");
    process.exit(0);
});
//# sourceMappingURL=test-script.js.map