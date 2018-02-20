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
var ListFieldComponent = (function () {
    function ListFieldComponent() {
        this.userRole = 0;
        this.ready = false;
        this.reduced = false;
    }
    ListFieldComponent.prototype.ngOnInit = function () {
        this.ready = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ListFieldComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ListFieldComponent.prototype, "userRole", void 0);
    ListFieldComponent = __decorate([
        core_1.Component({
            selector: 'list',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], ListFieldComponent);
    return ListFieldComponent;
}());
exports.ListFieldComponent = ListFieldComponent;
//# sourceMappingURL=script.js.map