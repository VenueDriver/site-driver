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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pd_service_1 = require("../../services/pd.service");
var config_service_1 = require("../../services/config.service");
var EventFilter = /** @class */ (function () {
    function EventFilter(PdService, siteConfig) {
        this.PdService = PdService;
        this.siteConfig = siteConfig;
        this.venues = [];
        this.artists = [];
        this.active = { artist: [], venue: [] };
        this.filterList = { venue: [], artist: [] };
    }
    EventFilter.prototype.toggle = function (type, data, i) {
        this.active[type][i] = !this.active[type][i];
        if (this.active[type][i]) {
            this.filterList[type].push(data.id);
        }
        else {
            this.filterList[type].splice(this.filterList[type].indexOf(data.id), 1);
        }
        this.PdService.events({ venues: this.filterList.venue, artists: this.filterList.artist });
    };
    EventFilter.prototype.ngOnInit = function () {
        var _this = this;
        this.PdService.artists().then(function (artists) { return _this.artists = artists; });
        this.PdService.venues(this.siteConfig.get().data.venues).then(function (venues) { return _this.venues = venues; });
    };
    EventFilter = __decorate([
        core_1.Component({
            selector: 'event-filter',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }),
        __metadata("design:paramtypes", [pd_service_1.PdService, config_service_1.Config])
    ], EventFilter);
    return EventFilter;
}());
exports.EventFilter = EventFilter;
//# sourceMappingURL=script.js.map