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
var Molecule = require("@molecule-driver/molecule");
var TextMolecule = /** @class */ (function (_super) {
    __extends(TextMolecule, _super);
    function TextMolecule(data) {
        var _this = _super.call(this, data) || this;
        _this._type = "text";
        /* Value must be a string. */
        if (typeof _this._value != 'string') {
            throw new Error("Expected '_value' to be of type 'string'. Value was reverted to '' for molecule ", _this);
        }
        return _this;
    }
    return TextMolecule;
}(Molecule));
exports.TextMolecule = TextMolecule;
module.exports = TextMolecule;
//# sourceMappingURL=index.js.map