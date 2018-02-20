"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/image-field/script');
var field_1 = require('./field');
var ImageField = (function (_super) {
    __extends(ImageField, _super);
    function ImageField(opts, _child) {
        if (_child === void 0) { _child = []; }
        _super.call(this, opts._name, script_1.ImageFieldComponent, opts);
        this._value = opts._value || '';
    }
    return ImageField;
}(field_1.Field));
exports.ImageField = ImageField;
//# sourceMappingURL=image.js.map