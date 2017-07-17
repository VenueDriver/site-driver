"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/event/script');
var field_1 = require('./field');
var Event = (function (_super) {
    __extends(Event, _super);
    function Event(opts) {
        _super.call(this, opts._name, script_1.EventFieldComponent, opts);
        this._filter = opts._filter;
    }
    return Event;
}(field_1.Field));
exports.Event = Event;
//# sourceMappingURL=event.js.map