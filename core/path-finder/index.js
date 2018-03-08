"use strict";
var path = require("path");
var fs = require("fs-extra");
var asyncloop = require("flexible-asyncloop");
var MD = {
    plugins: function () {
        return [{
                name: 'plugin',
                front: {
                    ngModule: 'src/app/cell-builder/module#CellBuilderModule',
                    ngRoute: {
                        path: '/cell-builder'
                    }
                }
            }];
    }
};
var RouteInjector = (function () {
    function RouteInjector() {
        this.plugins = [];
        this.routes = {};
        this.plugins = MD.plugins();
    }
    RouteInjector.prototype.findRoot = function (moduleName) {
        if (moduleName === void 0) { moduleName = ''; }
        var result = path.join(require.resolve('@molecule-driver/molecule'), '/../../', moduleName);
        return result;
    };
    RouteInjector.prototype.mapRoutes = function () {
        var _this = this;
        this.routes.root = this.findRoot();
        this.plugins.forEach(function (plugin) {
            var route = _this.routes[plugin.name] = {};
            if (plugin.front) {
                route.front = {
                    src: path.join(_this.findRoot(plugin.name), '/front'),
                    dest: path.join(_this.findRoot('client'), '/front/.build/', plugin.name)
                };
            }
        });
        return this.routes;
    };
    RouteInjector.prototype.buildFront = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var routeNames = Object.keys(_this.mapRoutes()).filter(function (name) { return name != 'root'; });
            var i = 0;
            asyncloop(function () { return i >= routeNames.length; }, function (next, end) {
                var route = _this.routes[routeNames[i]];
                console.log("Copying ", routeNames[i], " | from ", route.front.src, " to ", route.front.dest);
                fs.copy(route.front.src, route.front.dest, function (err) {
                    if (err) {
                        end(true);
                    }
                    else {
                        i++;
                        next();
                    }
                });
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
                ;
            });
        });
    };
    return RouteInjector;
}());
module.exports = RouteInjector;
//# sourceMappingURL=index.js.map