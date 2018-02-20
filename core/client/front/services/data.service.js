"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ng2_dragula_1 = require('ng2-dragula');
require('rxjs/Rx');
// import {
//   Group,
//   Text,
//   Column,
//   Link,
//   Row,
//   cmsNumber,
//   cmsDate,
//   Color,
//   Artist,
//   Venue,
//   List,
//   ImageField,
//   FileField,
//   Slide,
//   Slider,
//   Event
// } from '../../models/models';
var asyncLoop = function (condition, work, end) {
    if (condition()) {
        end();
    }
    else {
        work(function () { return asyncLoop(condition, work, end); }, end);
    }
};
var types = {};
var DataService = (function () {
    function DataService(http, dragulaService) {
        var _this = this;
        this.http = http;
        this.dragulaService = dragulaService;
        this.availableTypes = Object.keys(types);
        this.sites = [];
        dragulaService.drop.subscribe(function (value) {
            _this.calculatePaths();
        });
    }
    DataService.prototype.ngOnInit = function () {
        this.getSitesList();
    };
    // POST TO SERVER
    DataService.prototype.postToServer = function (action, data, h) {
        var headers = new http_1.Headers();
        h.forEach(function (head) {
            headers.append(head.name, head.value);
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(action, data, options)
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.userRole = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.postToServer("/user/role", {}, [
                { name: "Content-Type", value: "multipart/form-data" }
            ]).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    // SAVE DATA FOR AN ITEM
    DataService.prototype.save = function (data, next) {
        var _this = this;
        if (data === void 0) { data = this.current; }
        if (next === void 0) { next = function (data) { return null; }; }
        if (data === null)
            data = this.current;
        this.parseFileFields(Object.assign({}, data)).then(function (data) {
            var formData = new FormData();
            data._child = JSON.stringify(data._child);
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
            _this.postToServer("/site/save", formData, []).subscribe(function (data) {
                console.log("site saved", data);
                next(data);
            });
        });
    };
    // NEW SITE
    DataService.prototype.newSite = function (data, next) {
        this.save(data, next);
    };
    DataService.prototype.saveCell = function (cell) {
        var _this = this;
        var data = cell; // ALIAS
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            if (cell.hasOwnProperty("_child"))
                data._child = JSON.stringify(data._child);
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
            _this.postToServer("/cell/save", formData, []).subscribe(function (data) {
                console.log("Cell Saved", data);
                resolve(data);
            });
        });
    };
    DataService.prototype.uploadFile = function (data, domain) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append("_file", data._file);
            formData.append("_folder", domain);
            _this.postToServer("/upload/file", formData, []).subscribe(function (url) {
                console.log("File uploaded", url);
                resolve(url);
            });
        });
    };
    DataService.prototype.parseFileFields = function (data, domain) {
        var _this = this;
        if (domain === void 0) { domain = false; }
        if (!domain) {
            domain = data._domain;
        }
        return new Promise(function (resolve, reject) {
            asyncLoop(function () { return false; }, function (next, end) {
                var upload = function (next) {
                    _this.uploadFile(data, domain).then(function (url) {
                        console.log("Uploading file...");
                        delete data._file;
                        if (data.hasOwnProperty("_icon")) {
                            data._icon = url.url;
                        }
                        else {
                            data._value = url.url;
                        }
                        next();
                    });
                };
                var parseChild = function (next) {
                    if (data.hasOwnProperty("_child")) {
                        if (data._child.length > 0) {
                            var i_1 = 0;
                            asyncLoop(function () { return i_1 >= data._child.length; }, function (next, end) {
                                _this.parseFileFields(data._child[i_1], domain).then(function () {
                                    i_1++;
                                    next();
                                });
                            }, next);
                        }
                        else {
                            next();
                        }
                    }
                    else {
                        next();
                    }
                };
                if (data.hasOwnProperty("_file")) {
                    upload(function () {
                        parseChild(end);
                    });
                }
                else {
                    parseChild(end);
                }
            }, function () { return resolve(data); });
        });
    };
    DataService.prototype.newField = function (data) {
        if (!data.hasOwnProperty("_type")) {
            data._type = data._typeComponent;
        }
        else {
            data._typeComponent = data._type;
        }
        return new types[data._typeComponent](data);
    };
    DataService.prototype.find = function (path, ref) {
        if (ref === void 0) { ref = this.current; }
        if (path.length > 0) {
            return this.find(path.filter(function (val, i) { return i > 0; }), ref._child[path[0]]);
        }
        else {
            return ref;
        }
    };
    // LOAD DATA FOR AN ITEM
    DataService.prototype.get = function (itemType, itemID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getSitesList().then(function (sites) {
                resolve(sites.find(function (item) { return item._domain === itemID; }));
            });
        });
    };
    // SELECT ITEM
    DataService.prototype.select = function (itemType, itemID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.get(itemType, itemID).then(function (site) {
                _this.current = site;
                _this.calculatePaths();
                resolve(_this.current);
            });
        });
    };
    // UNSELECT ITEM
    DataService.prototype.unselect = function () {
        this.current = { _child: [] };
    };
    // GET SELECTED ITEM
    DataService.prototype.selected = function () {
        return this.current;
    };
    DataService.prototype.getSitesList = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var options = new http_1.RequestOptions({ headers: headers });
            _this.http.get("/site/list")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.sites = data;
                _this.parseTypes();
                resolve(_this.sites);
            });
        });
    };
    DataService.prototype.parseTypes = function () {
        var _this = this;
        var localParse = function (elements) {
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var site = elements_1[_i];
                if (site.hasOwnProperty('_child')) {
                    if (site._child.length > 0) {
                        localParse(site._child);
                    }
                }
                site._typeComponent = _this.newField(site)._typeComponent;
            }
        };
        this.sites.forEach(function (site) {
            localParse(site._child);
        });
    };
    // BIND DATA
    DataService.prototype.post = function (path, newData) {
        path = path.map(function (el) { return el; });
        var position = (path.length > 0) ? this.find(path) : this.current;
        var newElement = this.newField(newData);
        position._child.push(newElement);
        this.calculatePaths();
    };
    // BIND DATA
    DataService.prototype.update = function (path, newData) {
        path = path.map(function (el) { return el; });
        var position = (path.length > 0) ? this.find(path) : this.current;
        var newElement = this.newField(newData);
        for (var _i = 0, _a = Object.keys(newElement); _i < _a.length; _i++) {
            var key = _a[_i];
            position[key] = newElement[key];
        }
        this.calculatePaths();
    };
    DataService.prototype.findParent = function (path) {
        return (path.length > 0) ? this.find(path) : this.current;
    };
    DataService.prototype.destroy = function (path) {
        console.log(path);
        path = path.map(function (el) { return el; });
        var i = path[path.length - 1];
        path.pop();
        var element = this.find(path);
        element._child.splice(i, 1);
        this.calculatePaths();
        console.log(this.selected());
    };
    DataService.prototype.calculatePaths = function (path, ref) {
        var _this = this;
        if (path === void 0) { path = []; }
        if (ref === void 0) { ref = this.current; }
        if (ref.hasOwnProperty("_child")) {
            ref._child.forEach(function (val, i) {
                var newPath = path.map(function (el) { return el; });
                newPath.push(i);
                ref._child[i]._path = newPath;
                _this.calculatePaths(newPath, val);
            });
        }
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, ng2_dragula_1.DragulaService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map