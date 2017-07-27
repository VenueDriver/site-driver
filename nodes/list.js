"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/list/script');
var field_1 = require('./field');
var List = (function (_super) {
    __extends(List, _super);
    function List(opts, child) {
        if (child === void 0) { child = []; }
        _super.call(this, opts._name, script_1.ListFieldComponent, opts);
        this._child = (opts._child) ? opts._child : [];
        this._useComponents = opts._useComponents;
    }
    return List;
}(field_1.Field));
exports.List = List;
//# sourceMappingURL=list.js.map