"use strict";
var nodes = require('../nodes');
var utils_1 = require('../../front/helpers/utils');
var Molecule = (function () {
    function Molecule(obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    Molecule.prototype.parse = function (obj) {
        if (obj === void 0) { obj = this; }
        return new Promise(function (resolve, reject) {
            resolve(true);
            // this.dataToNg(obj).catch(reject).then((parsed)=>{
            //   obj = parsed;
            //   resolve(obj);
            // })
        });
    };
    Molecule.prototype.insert = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (Array.isArray(_this._value)) {
                _this._value.push(obj);
                _this.parse().then(resolve).catch(reject);
            }
            else {
                console.log("Target value is not an Array");
                reject("Target value is not an Array");
            }
        });
    };
    Molecule.prototype._parseDataLayer = function (molecule) {
        return new Promise(function (resolve, reject) {
            if (nodes.hasOwnProperty(molecule._ngClass)) {
                var parsedMolecule = new nodes[molecule._ngClass](molecule);
                resolve(parsedMolecule);
            }
            else {
                reject("No class for " + molecule._ngClass);
            }
        });
    };
    Molecule.prototype.dataToNg = function (molecule) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            molecule = Object.assign({}, molecule);
            _this._parseDataLayer(molecule).then(function (parsedLayer) {
                if (Array.isArray(parsedLayer._value)) {
                    var i_1 = 0;
                    utils_1.aloop(function () { return i_1 >= parsedLayer._value.length; }, function (next, end) {
                        var currentLayer = parsedLayer._value[i_1];
                        _this.dataToNg(currentLayer).then(function (subLayer) {
                            parsedLayer._value[i_1] = subLayer;
                            i_1++;
                            next();
                        }).catch(function (error) { return end(error); });
                    }, function (error) {
                        if (error) {
                            // CHANGE ERROR FOR AN ERROR COMPONENT
                            // SO THIS WILL NOT BLOCK THE FLOW
                            reject(error);
                        }
                        else {
                            resolve(parsedLayer);
                        }
                    });
                }
                else {
                    resolve(parsedLayer);
                }
            }).catch(reject);
        });
    };
    return Molecule;
}());
exports.Molecule = Molecule;
//# sourceMappingURL=molecule.js.map