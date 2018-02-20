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
var common_1 = require('@angular/common');
var truncate_1 = require('../../pipes/truncate');
var pd_service_1 = require('../../services/pd.service');
var EventSelectComponent = (function () {
    function EventSelectComponent(PdService) {
        this.PdService = PdService;
        this.valueChange = new core_1.EventEmitter();
        this.listReady = new core_1.EventEmitter();
        this.filter = [];
        this.disabled = false;
        this.currentValue = false;
        this.ready = false;
    }
    EventSelectComponent.prototype.emitValue = function (value) {
        this.valueChange.emit(value);
    };
    EventSelectComponent.prototype.formatItems = function (item) {
        var date = new common_1.DatePipe('en-US').transform(item.date, "MMM dd y").toUpperCase();
        var title = new truncate_1.TruncatePipe().transform(item.title, 35);
        return "<span class=\"event-autocomplete-item\"><span class=\"item-date\">" + date + "</span> <b class=\"auto-complete-event\">" + title + "</b> - <span class=\"event-friendly-id\">" + item.get_friendly_id + "</span></span>";
    };
    EventSelectComponent.prototype.formatSelection = function (item) {
        var date = new common_1.DatePipe('en-US').transform(item.date, "MMM dd y").toUpperCase();
        var title = new truncate_1.TruncatePipe().transform(item.title, 35);
        return "[" + date + "] " + title + " - " + item.get_friendly_id;
    };
    EventSelectComponent.prototype.loadEvents = function () {
        var _this = this;
        this.ready = false;
        clearTimeout(this.timeoutHolder);
        this.timeoutHolder = setTimeout(function () {
            _this.PdService.events({ loadAll: true }).then(function (index) {
                _this.PdService.events(_this.filter).then(function (index) {
                    console.log(_this.filter, index.events.length);
                    _this.events = index.events;
                    _this.ready = true;
                });
            });
        }, 300);
    };
    EventSelectComponent.prototype.ngOnInit = function () {
        if (this.currentValue) {
            this.value = this.currentValue;
        }
        this.loadEvents();
    };
    EventSelectComponent.prototype.ngOnChanges = function (changes) {
        this.loadEvents();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventSelectComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], EventSelectComponent.prototype, "listReady", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventSelectComponent.prototype, "filter", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], EventSelectComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventSelectComponent.prototype, "currentValue", void 0);
    EventSelectComponent = __decorate([
        core_1.Component({
            selector: 'event-select',
            template: require('./template.html')
        }), 
        __metadata('design:paramtypes', [pd_service_1.PdService])
    ], EventSelectComponent);
    return EventSelectComponent;
}());
exports.EventSelectComponent = EventSelectComponent;
//# sourceMappingURL=script.js.map