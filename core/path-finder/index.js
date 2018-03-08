"use strict";
var path = require("path");
var fs = require("fs.extra");
var MD = {
    plugins: function () {
        return [{
                name: 'cell-builder',
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
        return path.join(require.resolve('@molecule-driver/client'), '../', moduleName);
    };
    RouteInjector.prototype.mapRoutes = function () {
        var _this = this;
        this.routes.root = this.findRoot();
        this.plugins.forEach(function (plugin) {
            var route = _this.routes[plugin.name];
            if (plugin.front) {
                route.front = {
                    src: path.join(_this.findRoot(plugin.name), '/front'),
                    dest: path.join(_this.findRoot('client'), '/front/.build')
                };
            }
        });
        return this.routes;
    };
    RouteInjector.prototype.buildFront = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Object.keys(_this.mapRoutes()).filter(function (name) { return name != 'root'; })
                .forEach(function (name) {
                var route = _this.routes[name];
                console.log("Copying ", route.src, route.dest);
                fs.copyRecursive(route.src, route.dest, { replace: true }, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                    ;
                });
            });
        });
    };
    return RouteInjector;
}());
module.exports = RouteInjector;
//# sourceMappingURL=index.js.map