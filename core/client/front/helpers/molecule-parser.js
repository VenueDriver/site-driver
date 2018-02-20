"use strict";
var nodes = require('../../definitions/nodes');
var utils_1 = require('./utils');
var MoleculeParser = (function () {
    function MoleculeParser() {
    }
    MoleculeParser.prototype._parseDataLayer = function (molecule) {
        return new Promise(function (resolve, reject) {
            if (nodes.hasOwnProperty(molecule._ngClass)) {
                var parsedMolecule = new nodes[molecule._ngClass](molecule);
                resolve(parsedMolecule);
            }
            else {
                // resolve(molecule);
                console.log(molecule);
                // alert("An error ocurred. Please contact the system administrator. " + '\nERROR: "No class for '+ molecule._ngClass+'"');
                reject("No class for " + molecule._ngClass);
            }
        });
    };
    MoleculeParser.prototype.toNg = function (molecule) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            molecule = Object.assign({}, molecule);
            _this._parseDataLayer(molecule).then(function (parsedLayer) {
                if (Array.isArray(parsedLayer._value)) {
                    var i_1 = 0;
                    utils_1.aloop(function () { return i_1 >= parsedLayer._value.length; }, function (next, end) {
                        var currentLayer = parsedLayer._value[i_1];
                        _this.toNg(currentLayer).then(function (subLayer) {
                            parsedLayer._value[i_1] = subLayer;
                            i_1++;
                            next();
                        }).catch(function (error) {
                            console.warn(error);
                            i_1++;
                            next();
                        });
                    }, function (error) {
                        if (error) {
                            // CHANGE ERROR FOR AN ERROR COMPONENT
                            // SO THIS WILL NOT BLOCK THE FLOW
                            console.error(error);
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
    MoleculeParser.prototype.toData = function (molecule) {
        var _this = this;
        var moleculeCopy = Object.assign({}, molecule);
        var deleteProp = function (element, prop) {
            if (element.hasOwnProperty(prop)) {
                delete element[prop];
            }
            return element;
        };
        var emptyProp = function (element, prop) {
            if (element.hasOwnProperty(prop)) {
                element[prop] = null;
            }
            return element;
        };
        var removeProperties = ['parser'];
        var emptyProperties = ['_ngComponent'];
        var cleanLayer = function (data) {
            Object.keys(data).forEach(function (key) {
                if (typeof data[key] == 'function' || removeProperties.indexOf(key) > -1) {
                    data = deleteProp(data, key);
                }
                ;
                if (emptyProperties.indexOf(key) > -1) {
                    data = emptyProp(data, key);
                }
            });
            if (data.hasOwnProperty("_value")) {
                if (Array.isArray(data._value)) {
                    var arrayCopy_1 = data._value.map(function (el) { return el; });
                    arrayCopy_1.forEach(function (value, i) {
                        arrayCopy_1[i] = _this.toData(arrayCopy_1[i]);
                    });
                    data._value = arrayCopy_1;
                }
            }
            return data;
        };
        return cleanLayer(moleculeCopy);
    };
    return MoleculeParser;
}());
exports.MoleculeParser = MoleculeParser;
//# sourceMappingURL=molecule-parser.js.map