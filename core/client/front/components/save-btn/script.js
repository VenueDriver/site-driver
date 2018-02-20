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
var SaveButtonComponent = (function () {
    function SaveButtonComponent(dataService) {
        this.dataService = dataService;
        this.saving = false;
    }
    SaveButtonComponent.prototype.save = function () {
        var _this = this;
        this.saving = true;
        this.dataService.save(null, function (data) {
            _this.saving = false;
            if (data.hasOwnProperty("error")) {
                alert(data.error.join('\n'));
                console.log(data);
            }
            else {
                alert("Site updated");
            }
        });
    };
    SaveButtonComponent = __decorate([
        core_1.Component({
            selector: 'save-btn',
            template: require('./template.html'),
            styles: [require('./styles.css')],
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], SaveButtonComponent);
    return SaveButtonComponent;
}());
exports.SaveButtonComponent = SaveButtonComponent;
//# sourceMappingURL=script.js.map