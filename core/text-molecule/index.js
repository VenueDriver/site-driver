"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Molecule = require("@molecule-driver/molecule");
var TextMolecule = (function (_super) {
    __extends(TextMolecule, _super);
    function TextMolecule(data) {
        var _this = _super.call(this, data) || this;
        _this._type = "text";
        if (typeof _this._value != 'string') {
            throw new Error("Expected '_value' to be of type 'string' for molecule " + JSON.stringify(_this));
        }
        return _this;
    }
    return TextMolecule;
}(Molecule));
module.exports = TextMolecule;
//# sourceMappingURL=index.js.map