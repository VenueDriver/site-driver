"use strict";
var path = require("path");
var fs = require("fs-extra");
var asyncloop = require("flexible-asyncloop");
var colors = require("colors/safe");
var cp = require("child_process");
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
                    dest: path.join(_this.findRoot('client'), '/front/src/app/build/', plugin.name)
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
                console.log('');
                console.log(colors.bgWhite.bold.black(' COPYING "' + routeNames[i] + '" '));
                console.log(colors.cyan(route.front.src) + ' ==> ' + colors.green(route.front.dest));
                cp.exec('npm i', { cwd: path.join(route.front.src) }, function (error, stdout, stderr) {
                    if (!error) {
                        fs.copy(route.front.src, route.front.dest, function (err) {
                            if (err) {
                                end(true);
                            }
                            else {
                                i++;
                                next();
                            }
                        });
                    }
                    else {
                        end(true);
                    }
                });
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("npm run dev");
                    cp.exec('npm run dev', { cwd: path.join(_this.findRoot('client'), '/front') }, function (error, stdout, stderr) {
                        console.log("npm run dev done. Error:", error);
                        if (!error) {
                            resolve();
                        }
                        else {
                            reject(error);
                        }
                    });
                }
                ;
            });
        });
    };
    return RouteInjector;
}());
module.exports = RouteInjector;
//# sourceMappingURL=index.js.map