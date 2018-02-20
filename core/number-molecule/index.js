"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Molecule = require('@molecule-driver/molecule');
var NumberMolecule = (function (_super) {
    __extends(NumberMolecule, _super);
    function NumberMolecule(data) {
        _super.call(this, data);
        this._type = "number";
        /* Value must be a string. */
        if (typeof this._value != 'number') {
            throw new Error("Expected '_value' to be of type 'number' for molecule " + JSON.stringify(this));
        }
    }
    return NumberMolecule;
}(Molecule));
module.exports = NumberMolecule;
//# sourceMappingURL=index.js.map