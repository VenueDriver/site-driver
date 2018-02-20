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
var common_1 = require('@angular/common');
var MoleculeSave = (function () {
    function MoleculeSave(moleculeService, location) {
        this.moleculeService = moleculeService;
        this.location = location;
        this.afterSave = new core_1.EventEmitter();
        this.bussy = false;
    }
    MoleculeSave.prototype.ngOnInit = function () {
    };
    MoleculeSave.prototype.save = function () {
        var _this = this;
        this.bussy = true;
        this.molecule._type = this.type;
        console.log("molecule-save ", this.molecule, this.type);
        this.moleculeService.saveMolecule({
            type: this.type,
            name: this.molecule._name,
            id: this.molecule._id,
            data: this.molecule
        }).then(function (response) {
            _this.bussy = false;
            _this.afterSave.emit(true);
            console.log("All good saved", response);
            location.reload();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeSave.prototype, "molecule", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MoleculeSave.prototype, "type", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeSave.prototype, "afterSave", void 0);
    MoleculeSave = __decorate([
        core_1.Component({
            selector: 'molecule-save',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [molecule_service_1.MoleculeService, common_1.Location])
    ], MoleculeSave);
    return MoleculeSave;
}());
exports.MoleculeSave = MoleculeSave;
//# sourceMappingURL=script.js.map