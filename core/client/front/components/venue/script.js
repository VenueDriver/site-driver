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
var VenueFieldComponent = (function () {
    function VenueFieldComponent() {
        this.userRole = 0;
        this.ready = false;
        this.errors = [];
    }
    VenueFieldComponent.prototype.setValue = function (value) {
        this.data._value = value;
        this.validate(value);
    };
    VenueFieldComponent.prototype.ngOnInit = function () { };
    VenueFieldComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            if (value && value.dataType !== "venue") {
                _this.errors.push("Invalid venue value.");
            }
            if (value === null || value === undefined || !value) {
                _this.errors.push("Field required.");
            }
            resolve(true);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VenueFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], VenueFieldComponent.prototype, "userRole", void 0);
    VenueFieldComponent = __decorate([
        core_1.Component({
            selector: 'venue',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], VenueFieldComponent);
    return VenueFieldComponent;
}());
exports.VenueFieldComponent = VenueFieldComponent;
//# sourceMappingURL=script.js.map