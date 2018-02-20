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
var layouts_1 = require("./layouts");
var MoleculeGeneratorComponent = (function () {
    function MoleculeGeneratorComponent(dataService) {
        this.dataService = dataService;
        this.instances = [];
        this.isDeveloper = false;
        this.ready = false;
        this.animated = false;
        this.animated_modal = false;
        this.selectedLayout = "Default";
        this.show_new_molecule_form = false;
    }
    MoleculeGeneratorComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("GeneratorComponent", this.data);
        if (layouts_1.default.name.indexOf(this.data._options._layout) > -1)
            this.selectedLayout = this.data._options._layout;
        // console.log(this.data._name,"Use Layout",this.data._options._layout);
        // console.log(layouts.name.indexOf(this.data._options._layout) > -1,"Available layouts",layouts);
        this.dataService.userRole().then(function (data) {
            _this.ready = true;
            setTimeout(function () { _this.animated = true; }, 100);
            _this.isDeveloper = data.role > 9000;
        });
    };
    MoleculeGeneratorComponent.prototype.getComponent = function (layoutName) {
        console.log("Get layout component");
        return layouts_1.default.ngComponent[layoutName];
    };
    MoleculeGeneratorComponent.prototype.toggleModal = function () {
        var _this = this;
        this.show_new_molecule_form = !this.show_new_molecule_form;
        setTimeout(function () { _this.animated_modal = true; }, 100);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeGeneratorComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MoleculeGeneratorComponent.prototype, "instances", void 0);
    MoleculeGeneratorComponent = __decorate([
        core_1.Component({
            selector: 'molecule-generator',
            template: require('./template.html'),
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], MoleculeGeneratorComponent);
    return MoleculeGeneratorComponent;
}());
exports.MoleculeGeneratorComponent = MoleculeGeneratorComponent;
//# sourceMappingURL=script.js.map