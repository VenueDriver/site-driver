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
var ColorFieldComponent = (function () {
    function ColorFieldComponent() {
        this.userRole = 0;
        this.errors = [];
    }
    ColorFieldComponent.prototype.ngOnInit = function () {
        this.validate(this.data._value);
    };
    ColorFieldComponent.prototype.setValue = function (event) {
        this.data._value = event.target.value;
        this.validate(this.data._value);
    };
    ColorFieldComponent.prototype.validate = function (value) {
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
    ], ColorFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ColorFieldComponent.prototype, "userRole", void 0);
    ColorFieldComponent = __decorate([
        core_1.Component({
            selector: 'color',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], ColorFieldComponent);
    return ColorFieldComponent;
}());
exports.ColorFieldComponent = ColorFieldComponent;
//# sourceMappingURL=script.js.map