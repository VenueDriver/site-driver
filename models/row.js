"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/row/script');
var field_1 = require('./field');
var Row = (function (_super) {
    __extends(Row, _super);
    function Row(opts, child) {
        if (child === void 0) { child = []; }
        _super.call(this, opts._name || "", script_1.RowComponent, opts);
        this._child = child;
    }
    return Row;
}(field_1.Field));
exports.Row = Row;
//# sourceMappingURL=row.js.map