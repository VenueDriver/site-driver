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
var NumberMolecule = (function (_super) {
    __extends(NumberMolecule, _super);
    function NumberMolecule(data) {
        var _this = _super.call(this, data) || this;
        _this._type = "number";
        if (typeof _this._value != 'number') {
            throw new Error("Expected '_value' to be of type 'number' for molecule " + JSON.stringify(_this));
        }
        return _this;
    }
    return NumberMolecule;
}(Molecule));
module.exports = NumberMolecule;
//# sourceMappingURL=index.js.map