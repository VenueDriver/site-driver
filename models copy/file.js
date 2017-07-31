"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/file-field/script');
var field_1 = require('./field');
var FileField = (function (_super) {
    __extends(FileField, _super);
    function FileField(opts, _child) {
        if (_child === void 0) { _child = []; }
        _super.call(this, opts._name, script_1.FileFieldComponent, opts);
        this._value = opts._value || '';
    }
    return FileField;
}(field_1.Field));
exports.FileField = FileField;
//# sourceMappingURL=file.js.map