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
var common_1 = require('@angular/common');
var InstancePage = (function () {
    function InstancePage(route, moleculeService, location) {
        this.route = route;
        this.moleculeService = moleculeService;
        this.location = location;
        this.ready = false;
        this.isGenerator = false;
    }
    InstancePage.prototype.log = function (what) {
        console.log(what);
    };
    InstancePage.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.instanceID = params['id'];
            //  console.log("PARAM ID:",params['id']);
            //  console.log("Instance ID",this.instanceID);
            _this.moleculeService.getMoleculeList({
                type: ["instance"],
                id: _this.instanceID,
                where: {
                    _id: _this.instanceID
                }
            }).then(function (data) {
                console.log("Instance data", data);
                _this.data = data[0];
                _this.isGenerator = (_this.data._ngClass === "MoleculeGenerator");
                if (_this.isGenerator) {
                    _this.moleculeService.getMoleculeList({
                        type: ["instance"],
                        name: _this.data._options._molecule_types._value.map(function (value) { return value._name; }),
                        where: {
                            _generator: {
                                _name: _this.data._name,
                                _id: _this.data._id
                            }
                        }
                    }).then(function (instances) {
                        //  console.log("Has instances:",instances);
                        _this.instances = instances;
                        _this.ready = true;
                    });
                }
                else {
                    _this.ready = true;
                }
            });
        });
    };
    InstancePage.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    InstancePage.prototype.goBack = function (ev) {
        this.location.back();
    };
    InstancePage = __decorate([
        core_1.Component({
            selector: 'instance-page',
            template: require('./template.html'),
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, molecule_service_1.MoleculeService, common_1.Location])
    ], InstancePage);
    return InstancePage;
}());
exports.InstancePage = InstancePage;
//# sourceMappingURL=script.js.map