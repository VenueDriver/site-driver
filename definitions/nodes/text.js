"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var molecule_1 = require('./molecule'); // IMPORT NODE CLASS
var script_1 = require('../../front/components/text/script'); // IMPORT NG COMPONENT
var TextNode = (function (_super) {
    __extends(TextNode, _super);
    function TextNode(obj) {
        _super.call(this, obj);
        // THIS CLASS NAME
        this._ngClass = "TextNode";
        this._type = "text";
        this._label = "Text";
        this._ngComponent = script_1.TextNodeComponent;
        // OVERRIDES SPECIFIC TO THIS CLASS
        this._value = '';
        this._instance_of = '';
        this._options = {
            _use_textarea: false,
            _additional_css_classes: ''
        };
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    return TextNode;
}(molecule_1.Molecule));
exports.TextNode = TextNode;
//# sourceMappingURL=text.js.map