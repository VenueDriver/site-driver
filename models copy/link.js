"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/link-field/script');
var field_1 = require('./field');
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(opts, value) {
        if (value === void 0) { value = ""; }
        _super.call(this, opts._name, script_1.LinkFieldComponent, opts);
        this._value = opts._value || { label: "", url: "" };
    }
    return Link;
}(field_1.Field));
exports.Link = Link;
//# sourceMappingURL=link.js.map