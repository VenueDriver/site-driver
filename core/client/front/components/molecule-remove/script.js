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
var MoleculeRemove = (function () {
    function MoleculeRemove(moleculeService, location) {
        this.moleculeService = moleculeService;
        this.location = location;
        this.afterRemove = new core_1.EventEmitter();
        this.bussy = false;
    }
    MoleculeRemove.prototype.ngOnInit = function () {
    };
    MoleculeRemove.prototype.remove = function () {
        var _this = this;
        var confirmation = confirm("Are you sure you want to delete this " + this.molecule._name.replace(/\_/gi, ' ') + "?");
        if (confirmation) {
            this.bussy = true;
            this.moleculeService.removeMolecule(this.molecule).then(function (response) {
                _this.afterRemove.emit(true);
                _this.bussy = false;
                location.reload();
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeRemove.prototype, "molecule", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MoleculeRemove.prototype, "type", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeRemove.prototype, "afterRemove", void 0);
    MoleculeRemove = __decorate([
        core_1.Component({
            selector: 'molecule-remove',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [molecule_service_1.MoleculeService, common_1.Location])
    ], MoleculeRemove);
    return MoleculeRemove;
}());
exports.MoleculeRemove = MoleculeRemove;
//# sourceMappingURL=script.js.map