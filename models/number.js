"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/number/script');
var field_1 = require('./field');
var cmsNumber = (function (_super) {
    __extends(cmsNumber, _super);
    function cmsNumber(opts, value) {
        _super.call(this, opts._name, script_1.NumberNodeComponent, opts);
        this._value = 0;
    }
    return cmsNumber;
}(field_1.Field));
exports.cmsNumber = cmsNumber;
//# sourceMappingURL=number.js.map