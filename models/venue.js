"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/venue/script');
var field_1 = require('./field');
var Venue = (function (_super) {
    __extends(Venue, _super);
    function Venue(opts) {
        _super.call(this, opts._name, script_1.VenueFieldComponent, opts);
    }
    return Venue;
}(field_1.Field));
exports.Venue = Venue;
//# sourceMappingURL=venue.js.map