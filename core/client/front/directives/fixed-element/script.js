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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var FixedElementDirective = (function () {
    function FixedElementDirective(document, el, _renderer) {
        this.document = document;
        this.el = el;
        this._renderer = _renderer;
        this.landmark = [];
    }
    FixedElementDirective.prototype.onWindowScroll = function () {
        var screenScroll = this.document.body.scrollTop;
        var landmarkPosition = this.landmark.getBoundingClientRect();
        if (landmarkPosition.top < 1) {
            this._renderer.setElementClass(this.el.nativeElement, 'fixed-element-active', true);
        }
        else {
            this._renderer.setElementClass(this.el.nativeElement, 'fixed-element-active', false);
        }
    };
    FixedElementDirective.prototype.ngOnInit = function () {
        this.el.nativeElement.insertAdjacentHTML('beforebegin', "<div class='fixed-element-landmark'></div>");
        this.landmark = this.el.nativeElement.previousSibling;
    };
    __decorate([
        core_1.HostListener("window:scroll", []), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], FixedElementDirective.prototype, "onWindowScroll", null);
    FixedElementDirective = __decorate([
        core_1.Directive({ selector: '[fixedElement]' }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Document, core_1.ElementRef, core_1.Renderer])
    ], FixedElementDirective);
    return FixedElementDirective;
}());
exports.FixedElementDirective = FixedElementDirective;
//# sourceMappingURL=script.js.map