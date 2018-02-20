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
var FileNodeComponent = (function () {
    function FileNodeComponent(dataService) {
        this.dataService = dataService;
        this.data = { _can: { _edit_value: true }, _options: {}, _value: '' };
        this.userRole = 0;
        this.valueChange = new core_1.EventEmitter();
        this.additional_classes = [];
        this.panel = false;
        this.editing = false;
        this.ready = false;
        this.isDeveloper = false;
        this.errors = [];
    }
    FileNodeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.validate(this.data._value);
        this.parseAdditionalClasses();
        this.dataService.userRole().then(function (data) {
            _this.isDeveloper = data.role > 9000;
            _this.ready = true;
        });
    };
    FileNodeComponent.prototype.ngOnChanges = function () {
        this.parseAdditionalClasses();
    };
    FileNodeComponent.prototype.parseAdditionalClasses = function () {
        console.log("Parsing classes", this.data._options._additional_css_classes);
        if (this.data._options) {
            if (this.data._options._additional_css_classes)
                this.additional_classes = this.data._options._additional_css_classes.split(',');
        }
    };
    FileNodeComponent.prototype.openPanel = function () {
        this.panel = true;
    };
    FileNodeComponent.prototype.closePanel = function () {
        this.panel = false;
    };
    FileNodeComponent.prototype.togglePanel = function () {
        this.panel = !this.panel;
    };
    FileNodeComponent.prototype.isImage = function () {
        return (['.jpg', '.jpeg', '.png'].indexOf(this.data._value.match(/\.\w+$/)[0]) > -1);
    };
    FileNodeComponent.prototype.grabFiles = function (files) {
        this.data._value = files[0].src;
        this.valueChange.emit(files[0].src);
        this.closePanel();
        this.validate(this.data._value);
    };
    FileNodeComponent.prototype.validate = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.errors = [];
            if (typeof value !== "string" || value.length < 1) {
                _this.errors.push("Invalid or empty value.");
            }
            resolve(true);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FileNodeComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FileNodeComponent.prototype, "userRole", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FileNodeComponent.prototype, "valueChange", void 0);
    FileNodeComponent = __decorate([
        core_1.Component({
            selector: 'file-node',
            template: require('./template.html'),
            styles: [require('./styles.css')],
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], FileNodeComponent);
    return FileNodeComponent;
}());
exports.FileNodeComponent = FileNodeComponent;
//# sourceMappingURL=script.js.map