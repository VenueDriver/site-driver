"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/text/script');
var field_1 = require('./field');
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(opts, value) {
        if (value === void 0) { value = ""; }
        _super.call(this, opts._name, script_1.TextComponent, opts);
        this._value = opts._value || "";
        this._use_textarea = (opts.hasOwnProperty("_use_textarea")) ? opts._use_textarea : false;
    }
    return Text;
}(field_1.Field));
exports.Text = Text;
//# sourceMappingURL=text.js.map