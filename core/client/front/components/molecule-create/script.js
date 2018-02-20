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
// Helper component to add dynamic components
var MoleculeCreate = (function () {
    function MoleculeCreate() {
        this.canceled = new core_1.EventEmitter();
    }
    MoleculeCreate.prototype.updateMolecule = function (molecules) {
        this.newMolecule = molecules[0];
        // console.log("This Molecule:",this.newMolecule);
        if (this.generator) {
            this.newMolecule._generator = this.generator;
        }
    };
    MoleculeCreate.prototype.cancelCreation = function () {
        this.canceled.emit(true);
    };
    MoleculeCreate.prototype.log = function (message) {
        console.log(message);
    };
    MoleculeCreate.prototype.ngOnChanges = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MoleculeCreate.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeCreate.prototype, "generator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MoleculeCreate.prototype, "useMolecules", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeCreate.prototype, "canceled", void 0);
    MoleculeCreate = __decorate([
        core_1.Component({
            selector: 'molecule-create',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], MoleculeCreate);
    return MoleculeCreate;
}());
exports.MoleculeCreate = MoleculeCreate;
//# sourceMappingURL=script.js.map