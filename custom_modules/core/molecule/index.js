"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Molecule = /** @class */ (function () {
    function Molecule(data) {
        this._name = '';
        this._id = '';
        this._type = 'molecule';
        this._value = null;
        var readOnly = ['_type'];
        for (var key in data) {
            if (!readOnly.includes(key))
                this[key] = data[key];
        }
    }
    return Molecule;
}());
exports.Molecule = Molecule;
module.exports = Molecule;
//# sourceMappingURL=index.js.map