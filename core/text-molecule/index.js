"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Molecule = require('@molecule-driver/molecule');
var TextMolecule = (function (_super) {
    __extends(TextMolecule, _super);
    function TextMolecule(data) {
        _super.call(this, data);
        this._type = "text";
        /* Value must be a string. */
        if (typeof this._value != 'string') {
            throw new Error("Expected '_value' to be of type 'string' for molecule " + JSON.stringify(this));
        }
    }
    return TextMolecule;
}(Molecule));
module.exports = TextMolecule;
//# sourceMappingURL=index.js.map