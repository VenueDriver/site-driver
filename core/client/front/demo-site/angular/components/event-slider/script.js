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
var window_ref_1 = require("../../helpers/window-ref");
var pd_service_1 = require("../../services/pd.service");
var config_service_1 = require("../../services/config.service");
var EventSlider = /** @class */ (function () {
    function EventSlider(PdService, WindowRef, config) {
        this.PdService = PdService;
        this.WindowRef = WindowRef;
        this.config = config;
        this.reservationOpen = false;
        this.events = [];
        this.selectedEvent = {};
        this.carouselOptions = {
            items: 1,
            pagination: false,
            responsive: {
                1300: {
                    items: 4
                },
                960: {
                    items: 3
                },
                768: {
                    items: 2
                }
            }
        };
    }
    EventSlider.prototype.ngOnInit = function () {
        var _this = this;
        this.PdService.events().then(function (index) {
            _this.selectedEvent = index.events[0];
            _this.ready = true;
            for (var i = 0; i < 4; i++) {
                _this.events.push(index.events[i]);
            }
        });
    };
    EventSlider.prototype.openReservation = function () {
        this.reservationOpen = true;
    };
    EventSlider.prototype.closeReservation = function () {
        this.reservationOpen = false;
    };
    EventSlider.prototype.selectEvent = function (ev) {
        this.selectedEvent = ev;
    };
    EventSlider = __decorate([
        core_1.Component({
            selector: 'event-slider',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }),
        __metadata("design:paramtypes", [pd_service_1.PdService, window_ref_1.WindowRef, config_service_1.Config])
    ], EventSlider);
    return EventSlider;
}());
exports.EventSlider = EventSlider;
//# sourceMappingURL=script.js.map