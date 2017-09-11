"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var molecule_1 = require('./molecule'); // IMPORT NODE CLASS
var script_1 = require('../../front/components/number/script'); // IMPORT NG COMPONENT
var NumberNode = (function (_super) {
    __extends(NumberNode, _super);
    function NumberNode(obj) {
        _super.call(this, obj);
        // THIS CLASS NAME
        this._ngClass = "NumberNode";
        this._type = "number";
        this._label = "Number";
        this._ngComponent = script_1.NumberNodeComponent;
        this._options = {
            _additional_css_classes: ''
        };
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    return NumberNode;
}(molecule_1.Molecule));
exports.NumberNode = NumberNode;
//# sourceMappingURL=number.js.map