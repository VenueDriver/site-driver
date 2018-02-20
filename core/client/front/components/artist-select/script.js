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
var ArtistSelectComponent = (function () {
    function ArtistSelectComponent(PdService) {
        this.PdService = PdService;
        this.valueChange = new core_1.EventEmitter();
        this.listReady = new core_1.EventEmitter();
        this.filter = [];
        this.disabled = false;
        this.currentValue = false;
        this.ready = false;
    }
    ArtistSelectComponent.prototype.emitValue = function (value) {
        this.valueChange.emit(value);
    };
    ArtistSelectComponent.prototype.formatItems = function (item) {
        return "(#" + item.id + ") " + item.name;
    };
    ArtistSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentValue) {
            this.value = this.currentValue;
        }
        this.PdService.artists().then(function (artists) {
            _this.PdService.artists(_this.filter).then(function (artists) {
                _this.artists = artists;
                _this.listReady.emit(true);
                _this.ready = true;
            });
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ArtistSelectComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ArtistSelectComponent.prototype, "listReady", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ArtistSelectComponent.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ArtistSelectComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ArtistSelectComponent.prototype, "currentValue", void 0);
    ArtistSelectComponent = __decorate([
        core_1.Component({
            selector: 'artist-select',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [pd_service_1.PdService])
    ], ArtistSelectComponent);
    return ArtistSelectComponent;
}());
exports.ArtistSelectComponent = ArtistSelectComponent;
//# sourceMappingURL=script.js.map