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
var server_service_1 = require('./server.service');
var utils_1 = require('../helpers/utils');
var nodes = require('../../definitions/nodes');
var molecule_parser_1 = require('../helpers/molecule-parser');
var MoleculeService = (function () {
    function MoleculeService(_server) {
        this._server = _server;
        this.index = {};
        this.cache = {};
        this.parser = new molecule_parser_1.MoleculeParser();
    }
    MoleculeService.prototype.ngOnInit = function () {
        // console.log("init molecule service");
    };
    MoleculeService.prototype.validateMolecule = function (molecule) {
        return new Promise(function (resolve, reject) {
            resolve(true);
        });
    };
    MoleculeService.prototype.saveMolecule = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var queryID = new Date().getTime();
            _this.cache[queryID] = { query: query, action: "save" };
            query = _this.cache[queryID].query;
            _this.cache[queryID].id = queryID;
            query.data = _this.parser.toData(query.data);
            _this.validateMolecule(query.data).then(function () {
                _this._server.post("/molecule/save", query, []).subscribe(function (data) {
                    _this.cache[queryID].data = data;
                    // this.updateResults().then(()=>{
                    resolve(_this.cache[queryID]);
                    // }).catch(reject);
                }, function (error) {
                    console.log("Observable error", error);
                });
            });
        });
    };
    MoleculeService.prototype.removeMolecule = function (molecule) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {
                type: [molecule._type],
                name: [molecule._name],
                id: molecule._id,
                data: molecule
            };
            var queryID = new Date().getTime();
            _this.cache[queryID] = { query: query, action: "remove" };
            query = _this.cache[queryID].query;
            _this.cache[queryID].id = queryID;
            _this._server.post("/molecule/remove", query, []).subscribe(function (data) {
                _this.cache[queryID].data = data;
                // this.updateResults().then(()=>{
                resolve(_this.cache[queryID]);
                // }).catch(reject);
            }, function (error) {
                console.log("Observable error", error);
            });
        });
    };
    MoleculeService.prototype.getMoleculeList = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof query === "string") {
                query = {
                    type: [query]
                };
            }
            var queryID = JSON.stringify(query);
            if (!_this.index.hasOwnProperty(queryID)) {
                _this.index[queryID] = {
                    query: Object.assign({}, query),
                    id: queryID
                };
            }
            if (_this.index[queryID].data) {
                resolve(_this.index[queryID].data.slice());
            }
            else {
                _this._server.post("/molecule/get", query, []).subscribe(function (data) {
                    var i = 0;
                    utils_1.aloop(function () { return i >= data.length; }, function (next, end) {
                        _this.parser.toNg(data[i]).then(function (parsedResult) {
                            data[i] = parsedResult;
                            i++;
                            next();
                        }).catch(function (error) { return end(error); });
                    }, function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            _this.index[queryID].data = data;
                            // console.log("Get, resolved");
                            resolve(_this.index[queryID].data.slice());
                        }
                    });
                }, function (error) {
                    reject(error);
                });
            }
        });
    };
    MoleculeService.prototype.getAllMolecules = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getMoleculeList({ type: ['cell', 'generator'] }).catch(reject).then(function (data) {
                var fullList = data.map(function (cell) { return cell; });
                for (var key in nodes) {
                    fullList.push(new nodes[key]({}));
                }
                resolve(fullList);
            });
        });
    };
    MoleculeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_service_1.ServerService])
    ], MoleculeService);
    return MoleculeService;
}());
exports.MoleculeService = MoleculeService;
//# sourceMappingURL=molecule.service.js.map