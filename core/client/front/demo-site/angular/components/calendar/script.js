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
var pd_service_1 = require("../../services/pd.service");
var config_service_1 = require("../../services/config.service");
var router_2 = require("@angular/router");
var Calendar = /** @class */ (function () {
    function Calendar(PdService, config, route, router) {
        this.PdService = PdService;
        this.config = config;
        this.route = route;
        this.router = router;
        this.weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.currentDate = null;
        this.reservationOpen = false;
        this.monthsOptions = [];
        this.currentMonthOpt = {};
        this.yearsOptions = [];
        this.locationsOptions = [];
        this.dates = { years: {} };
        this.selectedEvent = {};
    }
    Calendar.prototype.init = function (startDate) {
        this.dates = { years: {} };
        var manyMonths = 0;
        this.opts = this.config.get().layout.calendar;
        this.fromDate = (startDate) ? new Date(startDate) : new Date(this.opts.calendarStart || new Date());
        this.toDate = new Date((new Date()).setMonth(new Date(this.fromDate).getMonth() + this.opts.showMonths));
        // console.log("Show Months: ",this.opts.showMonths);
        // console.log("From Date: ", this.fromDate);
        // console.log("To Date: ", this.toDate);
        // CALCULATE DATES
        var manyYears = this.toDate.getFullYear() - this.fromDate.getFullYear();
        // console.log("Many Years: ",manyYears);
        if (manyYears > 0) {
            manyMonths += 12 - this.fromDate.getMonth();
            manyMonths += this.toDate.getMonth();
            if (manyYears > 1) {
                manyMonths += (manyYears - 1) * 12;
            }
        }
        else {
            manyMonths = this.toDate.getMonth() - this.fromDate.getMonth();
        }
        // console.log("Many Months: ",manyMonths);
        for (var y = 0; y <= manyYears; y++) {
            //YEARS LOOP
            var cal_months = {};
            for (var m = 0; ((y > 0) ? m : m + this.fromDate.getMonth()) <= 11; m++) {
                //MONTHS LOOP
                var cal_days = {};
                var tempMonth = (y > 0) ? m : m + this.fromDate.getMonth();
                var current_month = cal_months[tempMonth + 1] = {};
                current_month.name = this.monthsName[tempMonth];
                current_month.index = tempMonth;
                current_month.length = new Date(this.fromDate.getFullYear() + y, tempMonth + 1, 0).getDate();
                for (var d = 1; d <= current_month.length; d++) {
                    //DAYS LOOP
                    cal_days[d] = {};
                    cal_days[d].index = new Date(this.fromDate.getFullYear() + y, tempMonth, d).getDay();
                    cal_days[d].name = this.weekDays[cal_days[d].index];
                    cal_days[d].number = d;
                    cal_days[d].month_number = current_month.index;
                    cal_days[d].month_index = tempMonth + 1;
                    cal_days[d].month = current_month.name;
                    cal_days[d].events = [];
                }
                cal_months[tempMonth + 1].days = cal_days;
                if (y === manyYears && tempMonth === this.toDate.getMonth()) {
                    m = 20; // END LOOP
                }
            }
            this.dates.years[this.fromDate.getFullYear() + y] = { months: cal_months };
        }
        // END CALCULATIONS
        // console.log(this.dates);
    };
    Calendar.prototype.build = function (events, venues, artists) {
        var clonedArray = [];
        for (var i = 0; i < events.length; i++) {
            clonedArray.push(events[i]);
        }
        ;
        var _loop_1 = function (i) {
            var data = events[i];
            if (this_1.dates.years.hasOwnProperty(data.date.getFullYear())) {
                if (this_1.dates.years[data.date.getFullYear()].months.hasOwnProperty(data.date.getMonth() + 1)) {
                    if (this_1.dates.years[data.date.getFullYear()].months[data.date.getMonth() + 1].days.hasOwnProperty(data.date.getDate())) {
                        data['venue'] = venues.find(function (venue) { return venue.id == data['venue_id']; });
                        var _loop_2 = function (a) {
                            data.artist_event[data.artist_event[a].artist_type] = artists.find(function (artist) { return artist.id == data.artist_event[a].artist_id; });
                            data.artist_event[data.artist_event[a].artist_type].area = data.venue.areas.find(function (area) { return area.id == data.artist_event[a].area_id; });
                        };
                        for (var a = 0; a < data.artist_event.length; a++) {
                            _loop_2(a);
                        }
                        this_1.dates.years[data.date.getFullYear()].months[data.date.getMonth() + 1].days[data.date.getDate()].events.push(data);
                    }
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < events.length; i++) {
            _loop_1(i);
        }
        this.ready = true;
    };
    Calendar.prototype.updateFilterOptions = function () {
        for (var i = 0; i < this.monthsName.length; i++) {
            this.monthsOptions.push({ text: this.monthsName[i], value: i + 1 });
        }
        ;
        this.yearsOptions = [
            { text: (new Date()).getFullYear() - 1, value: (new Date()).getFullYear() - 1 },
            { text: (new Date()).getFullYear(), value: (new Date()).getFullYear() },
            { text: (new Date()).getFullYear() + 1, value: (new Date()).getFullYear() + 1 }
        ];
        this.defaultFilterMonth = { text: this.monthsName[(new Date()).getMonth()], value: this.monthsName[(new Date()).getMonth()].toLowerCase() };
        this.defaultFilterYear = this.yearsOptions[1];
    };
    Calendar.prototype.bootstrap = function (params) {
        var _this = this;
        this.activeFilter = {
            m: params['m'] || null,
            y: params['y'] || null
        };
        var startDate = null;
        if (params['y'] || params['m']) {
            startDate = params['y'] || new Date().getFullYear(); // YEAR
            startDate += "-";
            startDate += (params['m']) ? parseInt(params['m']) : new Date().getMonth(); // MONTH
            startDate += "-01";
            if (params['m']) {
                this.defaultFilterMonth = { text: this.monthsName[parseInt(params['m']) - 1], value: this.monthsName[parseInt(params['m']) - 1].toLowerCase() };
            }
            if (params['y']) {
                this.defaultFilterYear = { text: (new Date(params['y'] + "-05-31")).getFullYear(), value: (new Date(params['y'] + "-05-31")).getFullYear() };
            }
        }
        this.init(startDate || null);
        this.PdService.venues(this.config.get().data.venues).then(function (venues) {
            _this.locationsOptions = [];
            for (var _i = 0, venues_1 = venues; _i < venues_1.length; _i++) {
                var venue = venues_1[_i];
                _this.locationsOptions.push({ text: venue.city + ", " + venue.state, value: venue.id });
            }
            ;
            _this.PdService.events({ venues: _this.config.get().data.venues }).then(function (index) {
                _this.PdService.events().then(function (index) {
                    _this.PdService.artists().then(function (artists) {
                        _this.build(index.events, venues, artists);
                    });
                });
            });
        });
    };
    Calendar.prototype.ngOnInit = function () {
        var _this = this;
        this.updateFilterOptions();
        return this.route.queryParams.subscribe(function (params) {
            _this.bootstrap(params);
        });
    };
    Calendar.prototype.filterChanged = function (filterOption) {
        this.activeFilter[filterOption.name] = filterOption.option.value;
        var newFilterQuery = {};
        for (var key in this.activeFilter) {
            if (this.activeFilter[key]) {
                newFilterQuery[key] = this.activeFilter[key];
            }
        }
        var navigationExtras = {
            queryParams: newFilterQuery
        };
        this.router.navigate(['events'], navigationExtras);
    };
    Calendar.prototype.onReservationClick = function (ev) {
        this.reservationOpen = true;
        this.selectedEvent = ev;
    };
    Calendar = __decorate([
        core_1.Component({
            selector: 'calendar',
            template: require('./template.html'),
            styles: [require('./base-dark.css'), require('./styles.css')],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [pd_service_1.PdService,
            config_service_1.Config,
            router_1.ActivatedRoute,
            router_2.Router])
    ], Calendar);
    return Calendar;
}());
exports.Calendar = Calendar;
//# sourceMappingURL=script.js.map