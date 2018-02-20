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
var $ = require("jquery");
require("owl.carousel");
var OwlCarousel = /** @class */ (function () {
    function OwlCarousel(el, PdService) {
        this.el = el;
        this.PdService = PdService;
        this.defaultClass = 'owl-carousel';
        this.defaultOptions = { items: 3 };
    }
    OwlCarousel.prototype.ngAfterViewChecked = function () {
        for (var key in this.options) {
            this.defaultOptions[key] = this.options[key];
        }
        if ($('.owl-carousel .event').length >= this.items) {
            this.$owlElement = $(this.el.nativeElement).owlCarousel(this.defaultOptions);
        }
    };
    __decorate([
        core_1.HostBinding('class'),
        __metadata("design:type", Object)
    ], OwlCarousel.prototype, "defaultClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OwlCarousel.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], OwlCarousel.prototype, "items", void 0);
    OwlCarousel = __decorate([
        core_1.Component({
            selector: 'owl-carousel',
            template: "<ng-content></ng-content>",
            styles: [
                require('../../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css'),
                require('../../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css')
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, pd_service_1.PdService])
    ], OwlCarousel);
    return OwlCarousel;
}());
exports.OwlCarousel = OwlCarousel;
//# sourceMappingURL=script.js.map