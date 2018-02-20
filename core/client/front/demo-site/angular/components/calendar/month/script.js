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
var CalendarMonth = /** @class */ (function () {
    function CalendarMonth() {
        this.reservationClick = new core_1.EventEmitter();
    }
    CalendarMonth.prototype.reservationTrigger = function (event) {
        this.reservationClick.emit(event);
    };
    CalendarMonth.prototype.calculateWeeks = function () {
        this.weeks = [];
        var weekData = { days: [] };
        for (var day = 1; day <= this.month.length; day++) {
            weekData.days.push(this.month.days[day]);
            if (this.month.days[day].index >= 6 || day == this.month.length) {
                // FILL SHORT WEEKS WITH EMPTY DAYS
                if (weekData.days.length < 7) {
                    // CREATE AN EMPTY DAY
                    var emptyDay = { number: "", name: "", month: "", month_number: "", events: [], isPlaceHolder: true };
                    // DAY GOES AT THE END
                    if (weekData.days[0].index === 0) {
                        var daysLeft = 6 - weekData.days[weekData.days.length - 1].index;
                        for (var dl = 0; dl < daysLeft; dl++) {
                            weekData.days.push(emptyDay);
                        }
                        // DAY GOES AT THE BEGINING
                    }
                    else {
                        var daysLeft = weekData.days[0].index;
                        for (var dl = 0; dl < daysLeft; dl++) {
                            weekData.days.unshift(emptyDay);
                        }
                    }
                }
                this.weeks.push(weekData);
                weekData = { days: [] };
            }
        }
    };
    CalendarMonth.prototype.ngOnInit = function () {
        this.calculateWeeks();
    };
    CalendarMonth.prototype.ngOnChanges = function () {
        this.calculateWeeks();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CalendarMonth.prototype, "month", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CalendarMonth.prototype, "m", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CalendarMonth.prototype, "y", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CalendarMonth.prototype, "reservationClick", void 0);
    CalendarMonth = __decorate([
        core_1.Component({
            selector: 'month',
            template: require('./template.html'),
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], CalendarMonth);
    return CalendarMonth;
}());
exports.CalendarMonth = CalendarMonth;
//# sourceMappingURL=script.js.map