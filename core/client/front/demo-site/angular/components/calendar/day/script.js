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
var window_ref_1 = require("../../../helpers/window-ref");
var config_service_1 = require("../../../services/config.service");
var $ = require("jquery");
var CalendarDay = /** @class */ (function () {
    function CalendarDay(el, WindowRef, config) {
        this.el = el;
        this.WindowRef = WindowRef;
        this.config = config;
        this.reservationClick = new core_1.EventEmitter();
        this.reservationOpen = false;
        this.open = false;
        this.selectedEvent = {};
        this.resizePopup();
    }
    CalendarDay.prototype.mouseIn = function (ev) {
        this.resizePopup();
        this.open = true;
    };
    CalendarDay.prototype.mouseOut = function () {
        this.open = false;
    };
    CalendarDay.prototype.resizePopup = function () {
        var el = this.el.nativeElement;
        $(el).find('.event-card').css("height", "auto");
        this.popup = {
            l: "auto",
            r: "auto",
            t: 0,
            h: $(el).outerHeight() - 2,
            h2: $(el).find('.event-card').outerHeight() - $(el).outerHeight() + 2,
            h3: $(el).find('.event-card').outerHeight(),
            w: $(el).outerWidth() - 2
        };
        if ($(el).outerHeight() + $(el).find('.card-actions').outerHeight() > $(el).find('.event-card .keep-aspect-ratio').outerHeight()) {
            $(el).find('.event-card').css({
                "height": ($(el).outerHeight() + $(el).find('.card-actions').outerHeight() - 2) + "px"
            });
        }
        if (this.WindowRef.nativeWindow.innerWidth - el.offsetLeft > this.WindowRef.nativeWindow.innerWidth / 2) {
            // LEFT SIDE
            this.popup.l = $(el).outerWidth();
        }
        else {
            // RIGHT SIDE
            this.popup.r = $(el).outerWidth();
        }
    };
    CalendarDay.prototype.windowResize = function (ev) {
        this.resizePopup();
    };
    CalendarDay.prototype.reservationTrigger = function (event) {
        this.reservationClick.emit(event);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CalendarDay.prototype, "day", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CalendarDay.prototype, "d", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CalendarDay.prototype, "reservationClick", void 0);
    CalendarDay = __decorate([
        core_1.Component({
            selector: '[day]',
            template: require('./template.html'),
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, window_ref_1.WindowRef, config_service_1.Config])
    ], CalendarDay);
    return CalendarDay;
}());
exports.CalendarDay = CalendarDay;
//# sourceMappingURL=script.js.map