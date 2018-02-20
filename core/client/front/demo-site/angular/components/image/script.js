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
var Image = /** @class */ (function () {
    function Image(el, renderer) {
        el.nativeElement.style.opacity = 0.0;
        renderer.listen(el.nativeElement, 'load', this.showImage);
    }
    Image.prototype.showImage = function (event) {
        event.target.style.opacity = 1.0;
        event.target.className += " ready";
    };
    Image = __decorate([
        core_1.Component({
            selector: 'img[magic]',
            template: "<ng-content></ng-content>",
            styles: [require('./styles.css')],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
    ], Image);
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=script.js.map