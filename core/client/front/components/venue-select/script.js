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
var VenueSelectComponent = (function () {
    function VenueSelectComponent(PdService) {
        this.PdService = PdService;
        this.valueChange = new core_1.EventEmitter();
        this.listReady = new core_1.EventEmitter();
        this.filter = [];
        this.disabled = false;
        this.currentValue = false;
        this.ready = false;
    }
    VenueSelectComponent.prototype.emitValue = function (value) {
        this.valueChange.emit(value);
    };
    VenueSelectComponent.prototype.formatItems = function (item) {
        return "(#" + item.id + ") " + item.title;
    };
    VenueSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentValue) {
            this.value = this.currentValue;
        }
        this.PdService.venues().then(function (artists) {
            _this.PdService.venues(_this.filter).then(function (venues) {
                _this.venues = venues;
                _this.listReady.emit(true);
                _this.ready = true;
            });
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], VenueSelectComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], VenueSelectComponent.prototype, "listReady", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VenueSelectComponent.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], VenueSelectComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], VenueSelectComponent.prototype, "currentValue", void 0);
    VenueSelectComponent = __decorate([
        core_1.Component({
            selector: 'venue-select',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [pd_service_1.PdService])
    ], VenueSelectComponent);
    return VenueSelectComponent;
}());
exports.VenueSelectComponent = VenueSelectComponent;
//# sourceMappingURL=script.js.map