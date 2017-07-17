"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/col/script');
var field_1 = require('./field');
var Column = (function (_super) {
    __extends(Column, _super);
    function Column(opts, child) {
        if (child === void 0) { child = []; }
        _super.call(this, opts._name || "", script_1.ColumnComponent, opts);
        this._child = child;
        this._value = opts._value;
    }
    return Column;
}(field_1.Field));
exports.Column = Column;
//# sourceMappingURL=column.js.map