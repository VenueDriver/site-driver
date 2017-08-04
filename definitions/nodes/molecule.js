"use strict";
var molecule_parser_1 = require('../../front/helpers/molecule-parser');
var Molecule = (function () {
    function Molecule(obj) {
        this.parser = new molecule_parser_1.MoleculeParser();
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    Molecule.prototype.insert = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (Array.isArray(_this._value)) {
                _this.parser.toNg(obj).then(function (ngObj) {
                    _this._value.push(ngObj);
                    resolve(_this);
                }).catch(reject);
            }
            else {
                console.log("Target value is not an Array");
                reject("Target value is not an Array");
            }
        });
    };
    return Molecule;
}());
exports.Molecule = Molecule;
//# sourceMappingURL=molecule.js.map