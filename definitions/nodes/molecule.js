"use strict";
var molecule_parser_1 = require('../../front/helpers/molecule-parser');
var Molecule = (function () {
    function Molecule(obj) {
        // DEFAULT VALUES IMPLEMENTING THE INTERFACE
        this._name = '';
        this._id = '';
        this._instance_of = '';
        this._type = "molecule";
        this._label = "Molecule";
        this._value = null;
        this._path = [];
        this._default_value = null;
        this._can = {
            _be_required: false,
            _edit_value: true,
            _edit: false,
            _drag: false,
            _delete: false,
            _show: true
        };
        for (var key in obj) {
            this[key] = obj[key];
        }
        this.parser = new molecule_parser_1.MoleculeParser();
    }
    Molecule.prototype.insert = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (Array.isArray(_this._value)) {
                _this.parser.toNg(obj).then(function (ngObj) {
                    ngObj._instance_of = ngObj._id;
                    ngObj._id = '';
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