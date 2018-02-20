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
var pd_service_1 = require("../../services/pd.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var window_ref_1 = require("../../helpers/window-ref");
var EventDetail = /** @class */ (function () {
    function EventDetail(PdService, WindowRef, route, location) {
        this.PdService = PdService;
        this.WindowRef = WindowRef;
        this.route = route;
        this.location = location;
        this.event = {};
    }
    EventDetail.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.PdService.event(id).then(function (ev) { return _this.event = ev; });
        });
    };
    EventDetail = __decorate([
        core_1.Component({
            selector: 'event-detail',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }),
        __metadata("design:paramtypes", [pd_service_1.PdService,
            window_ref_1.WindowRef,
            router_1.ActivatedRoute,
            common_1.Location])
    ], EventDetail);
    return EventDetail;
}());
exports.EventDetail = EventDetail;
//# sourceMappingURL=script.js.map