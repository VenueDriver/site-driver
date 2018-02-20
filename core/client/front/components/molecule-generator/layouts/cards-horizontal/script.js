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
var GeneratorLayoutHorizontalCards = (function () {
    function GeneratorLayoutHorizontalCards() {
        this.ready = false;
        this.userRole = 0;
        this.savingData = false;
        this.editingList = {};
        this.show_new_molecule_form = false;
        this.show_generator_edit_form = false;
        this.use_only_childs = true;
    }
    GeneratorLayoutHorizontalCards.prototype.ngOnInit = function () {
        console.log("INSTANCES", this.instances);
        this.ready = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GeneratorLayoutHorizontalCards.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GeneratorLayoutHorizontalCards.prototype, "instances", void 0);
    GeneratorLayoutHorizontalCards = __decorate([
        core_1.Component({
            selector: 'generator-layout-horizontal-cards',
            template: require('./template.html'),
        }), 
        __metadata('design:paramtypes', [])
    ], GeneratorLayoutHorizontalCards);
    return GeneratorLayoutHorizontalCards;
}());
exports.GeneratorLayoutHorizontalCards = GeneratorLayoutHorizontalCards;
//# sourceMappingURL=script.js.map