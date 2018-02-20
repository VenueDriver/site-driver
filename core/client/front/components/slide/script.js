"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var SlideFieldComponent = (function () {
    function SlideFieldComponent() {
        this.userRole = 0;
        this.overwrite = false;
        this.panel = false;
        this.ready = false;
        this.filter_events = [];
        this.errors = [];
    }
    SlideFieldComponent.prototype.resetTMP = function () {
        this.data._value.tmp = {
            media: "",
            title: "",
            additional_text: "",
            buttons: [
                { label: "", url: "" },
                { label: "", url: "" }
            ]
        };
    };
    SlideFieldComponent.prototype.setDefaults = function () {
        this.data._value["media"] = "";
        this.data._value["title"] = "";
        this.data._value["additional_text"] = "";
        this.data._value["use_information_from"] = false;
        this.data._value["buttons"] = [
            { label: "", url: "" },
            { label: "", url: "" }
        ];
    };
    SlideFieldComponent.prototype.openPanel = function () {
        this.panel = true;
    };
    SlideFieldComponent.prototype.closePanel = function () {
        this.panel = false;
    };
    SlideFieldComponent.prototype.togglePanel = function () {
        this.panel = !this.panel;
    };
    SlideFieldComponent.prototype.isImage = function (value) {
        return (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tif', '.svg'].indexOf(this.data._value.media.match(/\.\w+$/)[0]) > -1);
    };
    SlideFieldComponent.prototype.grabFiles = function (files) {
        this.data._value.media = files[0].src;
        this.closePanel();
        this.validate(this.data._value);
    };
    SlideFieldComponent.prototype.ngOnInit = function () {
        this.resetTMP();
        if (this.data._value.use_item_type) { }
        else {
            this.data._value.use_item_type = "Custom Slide";
        }
        ;
        if (this.data._value.use_information_from) {
            this.setDataItem(this.data._value.use_information_from, true);
        }
        this.validate(this.data._value);
    };
    SlideFieldComponent.prototype.setValue = function (event) {
        //this.data._value = event.target.value;
        this.validate(this.data._value);
    };
    SlideFieldComponent.prototype.newItemToUse = function (itemType) {
        this.overwrite = false;
        this.resetTMP();
        this.setDefaults();
    };
    SlideFieldComponent.prototype.updateFilter = function (venue) {
        this.filter_events = [venue.id];
    };
    SlideFieldComponent.prototype.setDataItem = function (item, init) {
        if (init === void 0) { init = false; }
        this.overwrite = false;
        this.resetTMP();
        if (!init) {
            this.setDefaults();
            this.data._value.use_information_from = item;
        }
        switch (item.dataType) {
            case "artist":
                this.data._value.tmp = {
                    media: "//flyerdriver.com/flyer/squared/320/" + item.dataType + "/" + item.friendly_id + ".png",
                    title: item.name,
                    additional_text: "",
                    buttons: [
                        { label: "", url: "" },
                        { label: "", url: "" }
                    ]
                };
                break;
            case "venue":
                this.data._value.tmp = {
                    media: "//flyerdriver.com/flyer/squared/320/" + item.dataType + "/" + item.friendly_id + ".png",
                    title: item.title,
                    additional_text: item.description || "",
                    buttons: [
                        { label: "BUY TICKETS", url: "//ticketdriver.com/" + item.friendly_id + "/buy/tickets" },
                        { label: "", url: "" }
                    ]
                };
                break;
            case "event":
                this.data._value.tmp = {
                    media: "//flyerdriver.com/flyer/squared/320/" + item.dataType + "/" + item.id + ".png",
                    title: item.title,
                    additional_text: item.short_description || "",
                    buttons: [
                        { label: "BUY TICKETS", url: "//ticketdriver.com/" + item.get_friendly_id + "/buy/tickets/event/" + item.id },
                        { label: "RESERVE VIP", url: "//ticketdriver.com/" + item.get_friendly_id + "/apps/web/reservation?event=" + item.id }
                    ]
                };
                break;
        }
    };
    SlideFieldComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            if (value.media && value.media.length > 0) {
                _this.errors.push("Invalid or empty media.");
            }
            resolve(true);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SlideFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SlideFieldComponent.prototype, "userRole", void 0);
    SlideFieldComponent = __decorate([
        core_1.Component({
            selector: 'slide-field',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], SlideFieldComponent);
    return SlideFieldComponent;
}());
exports.SlideFieldComponent = SlideFieldComponent;
//# sourceMappingURL=script.js.map