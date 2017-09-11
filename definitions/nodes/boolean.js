"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var molecule_1 = require('./molecule'); // IMPORT NODE CLASS
var script_1 = require('../../front/components/boolean/script'); // IMPORT NG COMPONENT
var BooleanNode = (function (_super) {
    __extends(BooleanNode, _super);
    function BooleanNode(obj) {
        _super.call(this, obj);
        // THIS CLASS NAME
        this._ngClass = "BooleanNode";
        this._type = "boolean";
        this._label = "Boolean";
        this._ngComponent = script_1.BooleanNodeComponent;
        // OVERRIDES SPECIFIC TO THIS CLASS
        this._value = false;
        this._default_value = false;
        this._options = {
            _additional_css_classes: ''
        };
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    return BooleanNode;
}(molecule_1.Molecule));
exports.BooleanNode = BooleanNode;
//# sourceMappingURL=boolean.js.map