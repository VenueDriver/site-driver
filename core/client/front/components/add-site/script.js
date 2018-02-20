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
var data_service_1 = require('../../services/data.service');
var AddSiteComponent = (function () {
    function AddSiteComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.name = '';
        this.domain = '';
        this.icon = '';
        this.panel = false;
        this.s3panel = false;
        this.ready = false;
        this.savingData = false;
    }
    AddSiteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getSitesList().then(function (list) {
            _this.sites = list;
            _this.ready = true;
        });
    };
    AddSiteComponent.prototype.showPanel = function () {
        this.panel = true;
    };
    AddSiteComponent.prototype.hidePanel = function () {
        this.panel = false;
    };
    AddSiteComponent.prototype.save = function () {
        var _this = this;
        if (!this.savingData) {
            this.savingData = true;
            this.validate().then(function (errors) {
                if (errors.length < 1) {
                    var newSite = {
                        _domain: _this.domain,
                        _name: _this.name,
                        _icon: _this.icon,
                        _child: [],
                        _isNewSite: true
                    };
                    if (_this.baseSite) {
                        newSite._child = _this.baseSite._child;
                    }
                    _this.dataService.newSite(newSite, function (data) {
                        if (data.hasOwnProperty("error")) {
                            _this.savingData = false;
                            alert(data.error.join('\n'));
                            console.log(data);
                        }
                        else {
                            _this.savingData = false;
                            _this.hidePanel();
                            _this.router.navigate(['site', _this.domain]);
                        }
                    });
                }
                else {
                    _this.savingData = false;
                    alert(errors.join('\n'));
                }
            });
        }
    };
    AddSiteComponent.prototype.formatSelection = function (item) {
        return "" + item._domain;
    };
    AddSiteComponent.prototype.s3openPanel = function () {
        this.s3panel = true;
    };
    AddSiteComponent.prototype.s3closePanel = function () {
        this.s3panel = false;
    };
    AddSiteComponent.prototype.s3togglePanel = function () {
        this.s3panel = !this.s3panel;
    };
    AddSiteComponent.prototype.s3grabFiles = function (files) {
        this.icon = files[0].src;
        this.s3closePanel();
    };
    AddSiteComponent.prototype.validate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var errors = [];
            var siteExists = false;
            _this.sites.forEach(function (el) {
                if (el._domain === _this.domain)
                    siteExists = true;
            });
            if (siteExists) {
                errors.push("Domain name already exists.");
            }
            if (_this.domain.length < 3) {
                errors.push("Invalid domain provided.");
            }
            resolve(errors);
        });
    };
    AddSiteComponent.prototype.testlog = function (log) { console.log(log); };
    AddSiteComponent = __decorate([
        core_1.Component({
            selector: 'add-site',
            template: require('./template.html'),
            styles: [require('./styles.css')],
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router])
    ], AddSiteComponent);
    return AddSiteComponent;
}());
exports.AddSiteComponent = AddSiteComponent;
//# sourceMappingURL=script.js.map