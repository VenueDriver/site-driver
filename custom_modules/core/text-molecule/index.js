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
Object.defineProperty(exports, "__esModule", { value: true });
var molecule_1 = require("@molecule-driver/molecule");
var TextMolecule = /** @class */ (function (_super) {
    __extends(TextMolecule, _super);
    function TextMolecule(data) {
        var _this = _super.call(this, data) || this;
        _this._value = '';
        return _this;
    }
    return TextMolecule;
}(molecule_1.Molecule));
exports.TextMolecule = TextMolecule;
module.exports = TextMolecule;
//# sourceMappingURL=index.js.map