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
var pd_service_1 = require('../../services/pd.service');
var VenueListComponent = (function () {
    function VenueListComponent(PdService) {
        this.PdService = PdService;
        this.ready = false;
        this.activeItems = false;
        this.listChange = new core_1.EventEmitter();
    }
    VenueListComponent.prototype.toggleItem = function (item) {
        item.checked = !item.checked;
        this.listChange.emit(this.venues.filter(function (el) { return el.checked; }));
    };
    VenueListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.PdService.venues().then(function (venues) {
            _this.venues = venues.map(function (el) {
                var isActive = (_this.activeItems) ? _this.activeItems.indexOf(el.id) > -1 : false;
                el.checked = isActive;
                return el;
            });
            _this.ready = true;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VenueListComponent.prototype, "activeItems", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], VenueListComponent.prototype, "listChange", void 0);
    VenueListComponent = __decorate([
        core_1.Component({
            selector: 'venue-list',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [pd_service_1.PdService])
    ], VenueListComponent);
    return VenueListComponent;
}());
exports.VenueListComponent = VenueListComponent;
//# sourceMappingURL=script.js.map