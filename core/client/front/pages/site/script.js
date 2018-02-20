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
var SitePage = (function () {
    function SitePage(route, dataService) {
        this.route = route;
        this.dataService = dataService;
        this.title = "Site";
        this.ready = false;
        this.panel = false;
        this.userRole = 0;
    }
    SitePage.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.domain = params['domain'];
            _this.dataService.select("site", _this.domain).then(function (site) {
                _this.site = site;
                _this.ready = true;
                _this.dataService.userRole().then(function (data) {
                    _this.userRole = data.role;
                });
            });
        });
    };
    SitePage.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SitePage.prototype.openPanel = function () {
        this.panel = true;
    };
    SitePage.prototype.closePanel = function () {
        this.panel = false;
    };
    SitePage.prototype.togglePanel = function () {
        this.panel = !this.panel;
    };
    SitePage.prototype.grabFiles = function (files) {
        this.site._icon = files[0].src;
        this.closePanel();
    };
    SitePage = __decorate([
        core_1.Component({
            selector: 'site-page',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, data_service_1.DataService])
    ], SitePage);
    return SitePage;
}());
exports.SitePage = SitePage;
//# sourceMappingURL=script.js.map