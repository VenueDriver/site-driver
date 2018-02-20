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
var $ = require("jquery");
var OverlayComponent = /** @class */ (function () {
    function OverlayComponent() {
    }
    OverlayComponent.prototype.ngOnChanges = function () {
        if (this.open) {
            $('body,html').addClass("no-scroll");
        }
        else {
            $('body,html').removeClass("no-scroll");
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], OverlayComponent.prototype, "open", void 0);
    OverlayComponent = __decorate([
        core_1.Component({
            selector: 'overlay',
            template: "<ng-content></ng-content>",
            styles: [require('./styles.css')]
        }),
        __metadata("design:paramtypes", [])
    ], OverlayComponent);
    return OverlayComponent;
}());
exports.OverlayComponent = OverlayComponent;
//# sourceMappingURL=script.js.map