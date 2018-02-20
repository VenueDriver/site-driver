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
var TypeListComponent = (function () {
    function TypeListComponent(dataService) {
        this.dataService = dataService;
        this.ready = false;
        this.activeTypes = false;
        this.listChange = new core_1.EventEmitter();
    }
    TypeListComponent.prototype.toggleItem = function (item) {
        item.checked = !item.checked;
        this.listChange.emit(this.types.filter(function (el) { return el.checked; }).map(function (el) { return el.val; }));
    };
    TypeListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.types = this.dataService.availableTypes.map(function (el) {
            var isActive = (_this.activeTypes) ? _this.activeTypes.indexOf(el) > -1 : false;
            return { val: el, checked: isActive };
        });
        this.ready = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TypeListComponent.prototype, "activeTypes", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TypeListComponent.prototype, "listChange", void 0);
    TypeListComponent = __decorate([
        core_1.Component({
            selector: 'type-list',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], TypeListComponent);
    return TypeListComponent;
}());
exports.TypeListComponent = TypeListComponent;
//# sourceMappingURL=script.js.map