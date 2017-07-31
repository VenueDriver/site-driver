"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var script_1 = require('../front/components/slide/script');
var field_1 = require('./field');
var Slide = (function (_super) {
    __extends(Slide, _super);
    function Slide(opts, value) {
        if (value === void 0) { value = ""; }
        _super.call(this, opts._name, script_1.SlideFieldComponent, opts);
        this._filter = opts._filter;
        this._value = opts._value || {
            media: "",
            title: "",
            additional_text: "",
            buttons: [
                { label: "", url: "" },
                { label: "", url: "" }
            ],
            tmp: {
                media: "",
                title: "",
                additional_text: "",
                buttons: [
                    { label: "", url: "" },
                    { label: "", url: "" }
                ],
                use_item_type: "",
                use_information_from: false
            },
            use_item_type: "",
            use_information_from: false
        };
    }
    return Slide;
}(field_1.Field));
exports.Slide = Slide;
//# sourceMappingURL=slide.js.map