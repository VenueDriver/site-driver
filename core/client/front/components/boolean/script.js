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
var data_service_1 = require('../../services/data.service');
var BooleanNodeComponent = (function () {
    function BooleanNodeComponent(dataService) {
        this.dataService = dataService;
        this.additional_classes = [];
        this.isDeveloper = false;
        this.errors = [];
        this.editing = false;
        this.ready = false;
    }
    BooleanNodeComponent.prototype.parseAdditionalClasses = function () {
        if (this.data._options) {
            if (this.data._options._additional_css_classes)
                this.additional_classes = this.data._options._additional_css_classes.split(',');
        }
    };
    BooleanNodeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parseAdditionalClasses();
        this.validate(this.data._value);
        this.dataService.userRole().then(function (data) {
            _this.isDeveloper = data.role > 9000;
            _this.ready = true;
        });
    };
    BooleanNodeComponent.prototype.ngOnChanges = function () {
        this.parseAdditionalClasses();
    };
    BooleanNodeComponent.prototype.setValue = function (event) {
        //this.data._value = event.target.value;
        this.validate(this.data._value);
    };
    BooleanNodeComponent.prototype.toggle = function () {
        if (this.data._can._edit_value == true || this.isDeveloper) {
            this.data._value = !this.data._value;
        }
    };
    BooleanNodeComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            if (typeof value !== "number") {
                _this.errors.push("Invalid or empty value.");
            }
            resolve(true);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BooleanNodeComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BooleanNodeComponent.prototype, "userRole", void 0);
    BooleanNodeComponent = __decorate([
        core_1.Component({
            selector: 'boolean-node',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], BooleanNodeComponent);
    return BooleanNodeComponent;
}());
exports.BooleanNodeComponent = BooleanNodeComponent;
//# sourceMappingURL=script.js.map