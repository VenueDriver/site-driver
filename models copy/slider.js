"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/slider/script');
var field_1 = require('./field');
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider(opts, value) {
        if (value === void 0) { value = ""; }
        _super.call(this, opts._name, script_1.SliderFieldComponent, opts);
        this._child = (opts._child) ? opts._child : [];
        this._filter = opts._filter;
    }
    return Slider;
}(field_1.Field));
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map