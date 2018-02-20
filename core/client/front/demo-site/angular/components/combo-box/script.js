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
var router_1 = require("@angular/router");
var ComboBox = /** @class */ (function () {
    function ComboBox(el, router) {
        this.el = el;
        this.router = router;
        this.valueChange = new core_1.EventEmitter();
        this.open = false;
        this.selectedOption = { text: "", value: "" };
    }
    ComboBox.prototype.ngAfterViewInit = function () {
        this.selectedOption = this.default;
    };
    ComboBox.prototype.ngAfterViewChecked = function () {
        this.selectedOption = this.default;
        this.options = this.options;
    };
    ComboBox.prototype.triggerSelect = function () {
        this.open = !this.open;
    };
    ComboBox.prototype.onChange = function (option) {
        this.selectedOption = option;
        this.triggerSelect();
        this.valueChange.emit({ name: this.name, option: option });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ComboBox.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ComboBox.prototype, "default", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ComboBox.prototype, "name", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ComboBox.prototype, "valueChange", void 0);
    ComboBox = __decorate([
        core_1.Component({
            selector: 'combo-box',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, router_1.Router])
    ], ComboBox);
    return ComboBox;
}());
exports.ComboBox = ComboBox;
//# sourceMappingURL=script.js.map