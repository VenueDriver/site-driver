"use strict";
var molecule_parser_1 = require('../../front/helpers/molecule-parser');
var MoleculeGenerator = (function () {
    function MoleculeGenerator(obj) {
        // DEFAULT VALUES IMPLEMENTING THE INTERFACE
        this._name = '';
        this._id = '';
        this._type = "Text";
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
    MoleculeGenerator.prototype.insert = function (obj) {
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
    return MoleculeGenerator;
}());
exports.MoleculeGenerator = MoleculeGenerator;
//# sourceMappingURL=generator.js.map