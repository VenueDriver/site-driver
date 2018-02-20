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
var EventFieldComponent = (function () {
    function EventFieldComponent() {
        this.userRole = 0;
        this.ready = false;
        this.errors = [];
    }
    EventFieldComponent.prototype.setValue = function (value) {
        this.data._value = value;
        this.validate(value);
    };
    EventFieldComponent.prototype.ngOnInit = function () {
    };
    EventFieldComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            if (value && value.dataType !== "event") {
                _this.errors.push("Invalid event value.");
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
    ], EventFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], EventFieldComponent.prototype, "userRole", void 0);
    EventFieldComponent = __decorate([
        core_1.Component({
            selector: 'event',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], EventFieldComponent);
    return EventFieldComponent;
}());
exports.EventFieldComponent = EventFieldComponent;
//# sourceMappingURL=script.js.map