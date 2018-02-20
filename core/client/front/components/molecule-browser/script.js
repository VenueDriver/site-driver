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
var data_service_1 = require('../../services/data.service');
var MoleculeBrowserComponent = (function () {
    function MoleculeBrowserComponent(ref, dataService) {
        this.ref = ref;
        this.dataService = dataService;
        this.valueChange = new core_1.EventEmitter();
        this.additional_classes = [];
        this.isDeveloper = false;
        this.errors = [];
        this.editing = false;
        this.ready = false;
    }
    MoleculeBrowserComponent.prototype.parseAdditionalClasses = function () {
        if (this.data._options) {
            if (this.data._options._additional_css_classes)
                this.additional_classes = this.data._options._additional_css_classes.split(',');
        }
    };
    MoleculeBrowserComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Browser original data:", this.data);
        this.parseAdditionalClasses();
        this.validate(this.data._value);
        this.dataService.userRole().then(function (data) {
            _this.isDeveloper = data.role > 9000;
            _this.ready = true;
        });
    };
    MoleculeBrowserComponent.prototype.ngOnChanges = function () {
        this.parseAdditionalClasses();
    };
    MoleculeBrowserComponent.prototype.emitValue = function (hierarchyTree) {
        this.valueChange.emit(hierarchyTree);
        console.log("New value", hierarchyTree);
        this.data._value = hierarchyTree;
        this.ref.detectChanges();
    };
    MoleculeBrowserComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            resolve(true);
        });
    };
    MoleculeBrowserComponent.prototype.log = function (x) {
        console.log(x);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeBrowserComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeBrowserComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MoleculeBrowserComponent.prototype, "userRole", void 0);
    MoleculeBrowserComponent = __decorate([
        core_1.Component({
            selector: 'molecule-browser',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, data_service_1.DataService])
    ], MoleculeBrowserComponent);
    return MoleculeBrowserComponent;
}());
exports.MoleculeBrowserComponent = MoleculeBrowserComponent;
//# sourceMappingURL=script.js.map