var path = require("path");
var fs = require("fs");
var QueryFilter = require('../custom_modules/query-filter');
var mkdirp = require("mkdirp-promise");
var asyncLoop = require('./asyncloop');
var stringToJSON = function (str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        str = '{error: ' + e + '}';
    }
    return JSON.parse(str);
};
var LocalStorage = (function () {
    function LocalStorage(opts) {
        var _this = this;
        this.opts = {};
        this.opts.root = '_storage';
        this.opts.json = true;
        this.fs = (this.opts.hasOwnProperty('fs')) ? this.opts.fs : fs;
        this.opts.readFiles = true;
        Object.keys(opts).forEach(function (key) {
            _this.opts[key] = opts[key];
        });
        this.query = Object.assign({}, opts.query);
        this.encoding = "utf-8";
    }
    LocalStorage.prototype.getInstanceNames = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.readdir('instance', { readFiles: false }).then(function (names) {
                resolve(names);
            }).catch(reject);
        });
    };
    LocalStorage.prototype.queryRoutes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var types = _this.query.type || [], names = _this.query.name || [], routes = [];
            var i = 0;
            asyncLoop(function () { return i >= types.length; }, function (next, end) {
                var type = types[i];
                if (type === "instance") {
                    if (names.length > 0) {
                        names.forEach(function (name) {
                            routes.push(path.join(type, name, _this.query.format));
                        });
                        i++;
                        next();
                    }
                    else {
                        _this.getInstanceNames().then(function (nameList) {
                            nameList.forEach(function (name) {
                                routes.push(path.join(type, name, _this.query.format));
                            });
                            i++;
                            next();
                        }).catch(function (err) {
                            console.log(err);
                            end("Error While getting instance names.");
                        });
                    }
                }
                else {
                    routes.push(path.join(type, _this.query.format));
                    i++;
                    next();
                }
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(routes);
                }
            });
        });
    };
    LocalStorage.prototype.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryRoutes().then(function (routes) {
                var i = 0;
                var mergedResultList = [];
                asyncLoop(function () { return i >= routes.length; }, function (next, end) {
                    console.log("Read file");
                    _this.readdir(routes[i], { readFiles: true }).catch(reject).then(function (list) {
                        console.log("Done, apply query.");
                        var queryFilter = new QueryFilter(_this.query);
                        list = queryFilter.filter(list);
                        list.forEach(function (item) { return mergedResultList.push(item); });
                        console.log("Next ->");
                        i++;
                        next();
                    });
                }, function () {
                    resolve(mergedResultList);
                });
            });
        });
    };
    LocalStorage.prototype.write = function (data, location, filename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            location = path.join(_this.opts.root, location);
            mkdirp(location).then(function () {
                _this.fs.writeFile(path.join(location, filename), data, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        return resolve();
                    }
                });
            }).catch(reject);
        });
    };
    LocalStorage.prototype.post = function () {
        var route = path.join(this.query.type);
        var filename = this.query.name;
        if (this.query.type === "instance") {
            route = path.join(route, this.query.name);
            filename = this.query.id;
        }
        filename += '.json';
        route = path.join(route, this.query.format);
        return this.write(JSON.stringify(this.query.formattedData), route, filename);
    };
    LocalStorage.prototype.readFile = function (location, file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mergedLocation = path.join(_this.opts.root, location, file);
            _this.fs.readFile(mergedLocation, 'utf-8', function (err, data) {
                console.log("Done reading");
                if (err)
                    console.log("err:", err);
                if (_this.opts.json)
                    data = stringToJSON(data);
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    LocalStorage.prototype.readdir = function (location, opts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mergedLocation = path.join(_this.opts.root, location);
            mkdirp(mergedLocation).then(function () {
                _this.fs.readdir(mergedLocation, function (err, directory) {
                    directory = directory.filter(function (file) { return !(/^\./.test(file) && !/\.json$/gi.test(file)); });
                    if (err) {
                        reject(err);
                    }
                    else if (opts.readFiles) {
                        var files_1 = [];
                        var i_1 = 0;
                        asyncLoop(function () { return i_1 >= directory.length; }, function (next, end) {
                            _this.readFile(location, directory[i_1]).then(function (file) {
                                files_1.push(file);
                                i_1++;
                                next();
                            }).catch(function (err) {
                                end(err);
                            });
                        }, function (err) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(files_1);
                            }
                        });
                    }
                    else {
                        resolve(directory);
                    }
                });
            }).catch(reject);
        });
    };
    LocalStorage.prototype.unlink = function (location, filename) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mergedLocation = path.join(_this.opts.root, location, filename);
            _this.fs.unlink(mergedLocation, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(null, { message: filename + " removed." });
                }
            });
        });
    };
    LocalStorage.prototype.remove = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryRoutes().then(function (routes) {
                var i = 0;
                var id;
                if (_this.query.type.indexOf("instance") > -1) {
                    id = _this.query.id;
                }
                else if (_this.query.name.length == 1) {
                    id = _this.query.name[0];
                }
                else {
                    console.log("Malformed query", _this.query);
                    reject("Malformed query");
                }
                asyncLoop(function () { return i >= routes.length; }, function (next, end) {
                    _this.readdir(routes[i], { readFiles: false }).catch(reject).then(function (directory) {
                        var filename = false;
                        directory.forEach(function (file) {
                            var fname = file.replace(/\.json$/i, '');
                            if (fname === id) {
                                filename = fname + '.json';
                            }
                        });
                        if (filename) {
                            console.log("Removing", filename);
                            _this.unlink(routes[i], filename).then(end).catch(function (err) { return end(err); });
                        }
                        else {
                            i++;
                            next();
                        }
                    });
                }, function (err, message) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    };
    return LocalStorage;
}());
module.exports = LocalStorage;
//# sourceMappingURL=index.js.map