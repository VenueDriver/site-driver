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
var molecule_service_1 = require('../../services/molecule.service');
var PageHeader = (function () {
    function PageHeader(dataService, moleculeService) {
        this.dataService = dataService;
        this.moleculeService = moleculeService;
        this.open = false;
        this.ready = false;
        this.isDeveloper = false;
    }
    PageHeader.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.userRole().then(function (data) {
            _this.isDeveloper = data.role > 9000;
            _this.moleculeService.getMoleculeList({ type: ['generator'] }).then(function (data) {
                _this.generators = data;
                console.log("Generators List:", _this.generators);
                _this.ready = true;
            });
        });
    };
    PageHeader.prototype.openNav = function () {
        this.open = true;
    };
    PageHeader.prototype.closeNav = function () {
        this.open = false;
    };
    PageHeader.prototype.toggleNav = function () {
        this.open = !this.open;
    };
    PageHeader = __decorate([
        core_1.Component({
            selector: 'page-header',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, molecule_service_1.MoleculeService])
    ], PageHeader);
    return PageHeader;
}());
exports.PageHeader = PageHeader;
//# sourceMappingURL=script.js.map