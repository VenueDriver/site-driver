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
var TextNodeComponent = (function () {
    function TextNodeComponent(dataService) {
        this.dataService = dataService;
        this.additional_classes = [];
        this.userRole = 0;
        this.errors = [];
        this.isDeveloper = false;
        this.editing = false;
        this.ready = false;
    }
    TextNodeComponent.prototype.parseAdditionalClasses = function () {
        if (this.data._options) {
            if (this.data._options._additional_css_classes)
                this.additional_classes = this.data._options._additional_css_classes.split(',');
        }
    };
    TextNodeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parseAdditionalClasses();
        this.validate(this.data._value);
        this.dataService.userRole().then(function (data) {
            _this.isDeveloper = data.role > 9000;
            _this.ready = true;
        });
    };
    TextNodeComponent.prototype.ngOnChanges = function () {
        this.parseAdditionalClasses();
    };
    TextNodeComponent.prototype.setValue = function (event) {
        //this.data._value = event.target.value;
        this.validate(this.data._value);
    };
    TextNodeComponent.prototype.validate = function (value) {
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
    ], TextNodeComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TextNodeComponent.prototype, "userRole", void 0);
    TextNodeComponent = __decorate([
        core_1.Component({
            selector: 'text',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], TextNodeComponent);
    return TextNodeComponent;
}());
exports.TextNodeComponent = TextNodeComponent;
//# sourceMappingURL=script.js.map