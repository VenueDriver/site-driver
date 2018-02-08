"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Molecule = /** @class */ (function () {
    function Molecule(data) {
        this._name = '';
        this._id = '';
        this._type = '';
        this._value = null;
        for (var key in data) {
            this[key] = data[key];
        }
    }
    return Molecule;
}());
exports.Molecule = Molecule;
//# sourceMappingURL=index.js.map