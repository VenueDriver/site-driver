"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var window_ref_1 = require("./helpers/window-ref");
var root_component_1 = require("./root.component");
var script_1 = require("./components/owl-carousel/script");
var script_2 = require("./components/spinner/script");
var script_3 = require("./components/calendar/script");
var script_4 = require("./components/combo-box/script");
var script_5 = require("./components/calendar/year/script");
var script_6 = require("./components/calendar/month/script");
var script_7 = require("./components/calendar/week/script");
var script_8 = require("./components/calendar/day/script");
var script_9 = require("./components/image/script");
var script_10 = require("./components/event-list/script");
var script_11 = require("./components/event-slider/script");
var script_12 = require("./components/event-detail/script");
var script_13 = require("./components/overlay/script");
var script_14 = require("./components/event-filter/script");
var pd_service_1 = require("./services/pd.service");
var config_service_1 = require("./services/config.service");
var keys_1 = require("./pipes/keys");
var safe_1 = require("./pipes/safe");
var truncate_1 = require("./pipes/truncate");
var appRoutes = require('../site_config/routes');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [
                truncate_1.TruncatePipe,
                script_9.Image,
                script_4.ComboBox,
                script_2.Spinner,
                script_1.OwlCarousel,
                script_5.CalendarYear,
                script_6.CalendarMonth,
                script_7.CalendarWeek,
                script_8.CalendarDay,
                script_10.EventList,
                script_13.OverlayComponent,
                script_11.EventSlider,
                script_12.EventDetail,
                root_component_1.RootComponent,
                script_14.EventFilter,
                script_3.Calendar,
                keys_1.KeysPipe,
                safe_1.SafePipe
            ],
            providers: [
                pd_service_1.PdService,
                window_ref_1.WindowRef,
                config_service_1.Config,
                { provide: core_1.APP_INITIALIZER, useFactory: function (config) { return function () { return config.load(); }; }, deps: [config_service_1.Config], multi: true }
            ],
            bootstrap: [root_component_1.RootComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map