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
var MoleculeSelect = (function () {
    function MoleculeSelect(moleculeService) {
        this.moleculeService = moleculeService;
        this.ready = false;
        this.activeTypes = false;
        this.max = 1;
        this.valueChange = new core_1.EventEmitter();
    }
    MoleculeSelect.prototype.emitValue = function (item) {
        var newIdentity = function (molecule) {
            molecule._id = '';
            if (molecule._ngClass !== "MoleculeGenerator" && Array.isArray(molecule._value)) {
                molecule._value = molecule._value.map(newIdentity);
            }
            return Object.assign({}, molecule);
        };
        if (item) {
            item._instance_of = Object.assign({}, item)._id;
            if (this.max > 1 || this.max < 1) {
                item.checked = !item.checked;
                var returnList = this.typesList.filter(function (el) { return el.checked; });
                returnList = returnList.map(newIdentity);
                this.valueChange.emit(returnList);
            }
            else {
                console.log(newIdentity(item));
                this.valueChange.emit([newIdentity(item)]);
            }
        }
    };
    MoleculeSelect.prototype.formatItems = function (item) {
        return "" + (item._label || 'unnamed');
    };
    MoleculeSelect.prototype.update = function () {
        var _this = this;
        if (this.useMolecules) {
            if (this.useMolecules.length > 0 && typeof this.useMolecules[0] !== "string") {
                this.useMoleculesParsed = this.useMolecules.map(function (molecule) { return molecule._name; });
            }
            else {
                this.useMoleculesParsed = this.useMolecules;
            }
        }
        // console.log("USE THIS MOLECULES",this.useMoleculesParsed);
        return this.moleculeService.getAllMolecules().then(function (list) {
            if (_this.useMolecules) {
                // console.log(list);
                list = list.filter(function (el) { return _this.useMoleculesParsed.indexOf(el._name) > -1; });
            }
            _this.ready = true;
            _this.typesList = list;
            // console.log("Use Molecules:",this.useMolecules);
            if (_this.typesList.length === 1) {
                console.log("Selected this:", _this.typesList[0]);
                _this.emitValue(_this.typesList[0]);
            }
            // console.log("Selected:",this.typesList[0]);
        }).catch(function (err) {
            console.log(err);
        });
    };
    MoleculeSelect.prototype.ngOnInit = function () {
        this.update();
    };
    MoleculeSelect.prototype.ngOnChanges = function () {
        this.update();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeSelect.prototype, "activeTypes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MoleculeSelect.prototype, "max", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeSelect.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MoleculeSelect.prototype, "useMolecules", void 0);
    MoleculeSelect = __decorate([
        core_1.Component({
            selector: 'molecule-select',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [molecule_service_1.MoleculeService])
    ], MoleculeSelect);
    return MoleculeSelect;
}());
exports.MoleculeSelect = MoleculeSelect;
//# sourceMappingURL=script.js.map