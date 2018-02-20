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
var ImageFieldComponent = (function () {
    function ImageFieldComponent() {
        this.userRole = 0;
        this.panel = false;
        this.errors = [];
    }
    ImageFieldComponent.prototype.ngOnInit = function () {
        this.validate(this.data._value);
    };
    ImageFieldComponent.prototype.openPanel = function () {
        this.panel = true;
    };
    ImageFieldComponent.prototype.closePanel = function () {
        this.panel = false;
    };
    ImageFieldComponent.prototype.togglePanel = function () {
        this.panel = !this.panel;
    };
    ImageFieldComponent.prototype.isImage = function () {
        return (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tif', '.svg'].indexOf(this.data._value.match(/\.\w+$/)[0]) > -1);
    };
    ImageFieldComponent.prototype.grabFiles = function (files) {
        this.data._value = files[0].src;
        this.closePanel();
        this.validate(this.data._value);
    };
    ImageFieldComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            if (typeof value !== "string" || value.length < 1) {
                _this.errors.push("Invalid or empty value.");
            }
            resolve(true);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ImageFieldComponent.prototype, "userRole", void 0);
    ImageFieldComponent = __decorate([
        core_1.Component({
            selector: 'image-field',
            template: require('./template.html'),
            styles: [require('./styles.css')],
        }), 
        __metadata('design:paramtypes', [])
    ], ImageFieldComponent);
    return ImageFieldComponent;
}());
exports.ImageFieldComponent = ImageFieldComponent;
//# sourceMappingURL=script.js.map