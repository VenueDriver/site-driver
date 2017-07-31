"use strict";
var Field = (function () {
    function Field(name, type, opts) {
        if (opts === void 0) { opts = {}; }
        this._name = name || "";
        this._typeComponent = type;
        this._type = opts._type;
        this._path = [];
        this._required = opts._required;
        this._editable_value = opts._editable_value;
        this._editable_field = opts._editable_field;
        this._delete_field = opts._delete_field;
        this._visible_field = opts._visible_field;
    }
    return Field;
}());
exports.Field = Field;
//# sourceMappingURL=field.js.map