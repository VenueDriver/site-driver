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
var router_1 = require('@angular/router');
var molecule_service_1 = require('../../services/molecule.service');
var GeneratorPage = (function () {
    function GeneratorPage(route, moleculeService) {
        this.route = route;
        this.moleculeService = moleculeService;
        this.ready = false;
    }
    GeneratorPage.prototype.log = function (what) {
        console.log(what);
    };
    GeneratorPage.prototype.moleculeSelected = function (molecule) {
        // console.log("Selected",molecule);
        this.newMolecule = molecule;
    };
    GeneratorPage.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.generatorName = params['generator_name'];
            _this.moleculeService.getMoleculeList({
                type: ["generator"],
                where: {
                    _name: _this.generatorName
                } }).then(function (data) {
                _this.generator = data[0];
                // console.log("Showing generator:",this.generator._name,this.generator);
                _this.useMolecules = _this.generator._options._molecule_types._value.map(function (value) { return value._name; });
                _this.moleculeService.getMoleculeList({
                    type: ["instance"],
                    name: _this.useMolecules,
                    where: {
                        _generator: {
                            _name: _this.generatorName
                        }
                    }
                }).then(function (instances) {
                    //  console.log("Has instances:",instances);
                    _this.instances = instances;
                    _this.ready = true;
                });
            });
        });
    };
    GeneratorPage.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    GeneratorPage = __decorate([
        core_1.Component({
            selector: 'generator-page',
            template: require('./template.html'),
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, molecule_service_1.MoleculeService])
    ], GeneratorPage);
    return GeneratorPage;
}());
exports.GeneratorPage = GeneratorPage;
//# sourceMappingURL=script.js.map