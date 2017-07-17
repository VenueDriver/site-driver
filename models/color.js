"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/color/script');
var field_1 = require('./field');
var Color = (function (_super) {
    __extends(Color, _super);
    function Color(opts, value) {
        _super.call(this, opts._name, script_1.ColorFieldComponent, opts);
        this._value = opts._value || "#cc0000";
    }
    return Color;
}(field_1.Field));
exports.Color = Color;
//# sourceMappingURL=color.js.map