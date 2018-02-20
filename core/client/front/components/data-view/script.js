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
var DataViewComponent = (function () {
    function DataViewComponent(dataService) {
        this.dataService = dataService;
        this.userRole = 0;
    }
    DataViewComponent.prototype.ngOnInit = function () {
        this.selectedItem = this.dataService.selected();
        if (this.selectedItem._child.length > 0) {
            this.makeActive(this.selectedItem._child[0]);
        }
        console.log(this.selectedItem);
    };
    DataViewComponent.prototype.makeActive = function (section) {
        for (var _i = 0, _a = this.selectedItem._child; _i < _a.length; _i++) {
            var sec = _a[_i];
            sec._active_section = false;
        }
        section._active_section = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataViewComponent.prototype, "userRole", void 0);
    DataViewComponent = __decorate([
        core_1.Component({
            selector: 'data-view',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], DataViewComponent);
    return DataViewComponent;
}());
exports.DataViewComponent = DataViewComponent;
//# sourceMappingURL=script.js.map