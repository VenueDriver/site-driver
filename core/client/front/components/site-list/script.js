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
var SiteListComponent = (function () {
    function SiteListComponent(dataService) {
        this.dataService = dataService;
        this.ready = false;
    }
    SiteListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getSitesList().then(function (sites) {
            _this.sites = sites;
            _this.ready = true;
        });
    };
    SiteListComponent = __decorate([
        core_1.Component({
            selector: 'site-list',
            template: "<ng-content *ngIf=\"ready\"></ng-content>",
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], SiteListComponent);
    return SiteListComponent;
}());
exports.SiteListComponent = SiteListComponent;
//# sourceMappingURL=script.js.map