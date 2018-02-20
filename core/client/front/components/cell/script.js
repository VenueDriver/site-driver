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
var molecule_service_1 = require('../../services/molecule.service');
var data_service_1 = require('../../services/data.service');
var CellComponent = (function () {
    function CellComponent(moleculeService, dataService) {
        this.moleculeService = moleculeService;
        this.dataService = dataService;
        this.additional_classes = [];
        this.isDeveloper = false;
        this.reduced = false;
        this.editing = false;
        this.ready = false;
    }
    CellComponent.prototype.moleculeSelected = function (selected) {
        this.newMolecule = Object.assign({}, selected[0]);
    };
    CellComponent.prototype.ngOnChanges = function () {
        this.parseAdditionalClasses();
    };
    CellComponent.prototype.parseAdditionalClasses = function () {
        console.log("Parsing classes", this.data._options._additional_css_classes);
        if (this.data._options) {
            if (this.data._options._additional_css_classes)
                this.additional_classes = this.data._options._additional_css_classes.split(',');
        }
    };
    CellComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parseAdditionalClasses();
        this.dataService.userRole().then(function (data) {
            _this.isDeveloper = data.role > 9000;
            _this.ready = true;
        });
    };
    CellComponent.prototype.resetMolecule = function (event) {
        this.moleculeSelected(this.newMolecule);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CellComponent.prototype, "data", void 0);
    CellComponent = __decorate([
        core_1.Component({
            selector: 'cell',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [molecule_service_1.MoleculeService, data_service_1.DataService])
    ], CellComponent);
    return CellComponent;
}());
exports.CellComponent = CellComponent;
//# sourceMappingURL=script.js.map