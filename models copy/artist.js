"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/artist/script');
var field_1 = require('./field');
var Artist = (function (_super) {
    __extends(Artist, _super);
    function Artist(opts) {
        _super.call(this, opts._name, script_1.ArtistFieldComponent, opts);
        this._value = opts._value || null;
    }
    return Artist;
}(field_1.Field));
exports.Artist = Artist;
//# sourceMappingURL=artist.js.map