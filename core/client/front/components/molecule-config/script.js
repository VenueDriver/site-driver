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
var inputs = require('../inputs');
var MoleculeConfig = (function () {
    function MoleculeConfig() {
    }
    MoleculeConfig.prototype.ngOnInit = function () {
        this.resetValidation();
        this.validate();
    };
    MoleculeConfig.prototype.resetValidation = function () {
        this.validMolecule = false;
        this.hasOptions = false;
        this.hasName = false;
    };
    MoleculeConfig.prototype.canChange = function (key) {
        this.molecule._can[key] = !this.molecule._can[key];
    };
    MoleculeConfig.prototype.optionsChange = function (key) {
        if (typeof this.molecule._options[key] == "boolean") {
            this.molecule._options[key] = !this.molecule._options[key];
        }
    };
    MoleculeConfig.prototype.ngOnChanges = function () {
        this.resetValidation();
        this.validate();
    };
    MoleculeConfig.prototype.validate = function () {
        // console.log("TYPEOF MOLECULE",typeof this.molecule,"Molecule:",this.molecule);
        if (typeof this.molecule == 'object') {
            // console.log("molecule is object");
            this.validMolecule = this.molecule.hasOwnProperty('_can');
            this.hasOptions = this.molecule.hasOwnProperty("_options");
            this.hasName = this.molecule.hasOwnProperty("_name");
        }
    };
    MoleculeConfig.prototype.isBoolean = function (value) {
        return typeof (value) == 'boolean';
    };
    MoleculeConfig.prototype.isString = function (value) {
        return typeof (value) == 'string';
    };
    MoleculeConfig.prototype.isComplex = function (value) {
        return typeof (value) == 'object' && value.hasOwnProperty("_ngComponentName");
    };
    MoleculeConfig.prototype.getComponent = function (name) {
        return inputs[name];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeConfig.prototype, "molecule", void 0);
    MoleculeConfig = __decorate([
        core_1.Component({
            selector: 'molecule-config',
            template: require('./template.html'),
            styles: [require('./styles.css')],
        }), 
        __metadata('design:paramtypes', [])
    ], MoleculeConfig);
    return MoleculeConfig;
}());
exports.MoleculeConfig = MoleculeConfig;
//# sourceMappingURL=script.js.map