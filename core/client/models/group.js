"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/group/script');
var field_1 = require('./field');
var Group = (function (_super) {
    __extends(Group, _super);
    function Group(opts, _child) {
        if (_child === void 0) { _child = []; }
        _super.call(this, opts._name, script_1.GroupComponent, opts);
        this._child = (opts._child) ? opts._child : [];
        this._columns = opts._columns || 12;
    }
    return Group;
}(field_1.Field));
exports.Group = Group;
//# sourceMappingURL=group.js.map