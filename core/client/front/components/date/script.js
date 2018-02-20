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
var DateFieldComponent = (function () {
    function DateFieldComponent() {
        this.userRole = 0;
        this.calendar = false;
        this.errors = [];
        this.myDatePickerOptions = {
            dateFormat: 'yyyy-mm-dd',
            inline: true
        };
    }
    DateFieldComponent.prototype.ngOnInit = function () {
        this.validate(this.data._value);
    };
    DateFieldComponent.prototype.setValue = function (event) {
        console.log(this.data._value);
        this.data._value = new Date(event.jsdate).getTime();
        this.validate(this.data._value);
    };
    DateFieldComponent.prototype.getDate = function () {
        return new Date(this.data._value);
    };
    DateFieldComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            if ((new Date(value)) == "Invalid Date") {
                _this.errors.push("Invalid date value.");
            }
            if (value.length < 1) {
                _this.errors.push("The field is empty.");
            }
            resolve(true);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DateFieldComponent.prototype, "userRole", void 0);
    DateFieldComponent = __decorate([
        core_1.Component({
            selector: 'date-field',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], DateFieldComponent);
    return DateFieldComponent;
}());
exports.DateFieldComponent = DateFieldComponent;
//# sourceMappingURL=script.js.map