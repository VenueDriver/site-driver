"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/date/script');
var field_1 = require('./field');
var cmsDate = (function (_super) {
    __extends(cmsDate, _super);
    function cmsDate(opts) {
        _super.call(this, opts._name, script_1.DateFieldComponent, opts);
        this._value = opts._value || (new Date()).getTime();
    }
    return cmsDate;
}(field_1.Field));
exports.cmsDate = cmsDate;
//# sourceMappingURL=date.js.map