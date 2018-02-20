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
var FusionComponent = (function () {
    function FusionComponent() {
        this.afterInsert = new core_1.EventEmitter();
    }
    FusionComponent.prototype.insert = function () {
        var _this = this;
        this.node.insert(this.nodeInsert).then(function () {
            console.log("Fusion complete\n", _this.node);
        });
        this.afterInsert.emit(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FusionComponent.prototype, "node", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FusionComponent.prototype, "nodeInsert", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FusionComponent.prototype, "afterInsert", void 0);
    FusionComponent = __decorate([
        core_1.Component({
            selector: 'fusion',
            template: require('./template.html'),
            styles: [require('./styles.css')],
        }), 
        __metadata('design:paramtypes', [])
    ], FusionComponent);
    return FusionComponent;
}());
exports.FusionComponent = FusionComponent;
//# sourceMappingURL=script.js.map