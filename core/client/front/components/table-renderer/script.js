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
// Helper component to add dynamic components
var TableRenderer = (function () {
    function TableRenderer() {
        this.showEdition = {};
        this.openingEditInstance = {};
    }
    TableRenderer.prototype.ngOnChanges = function () {
        this.parseColumnsData();
    };
    TableRenderer.prototype.ngOnInit = function () {
        this.parseColumnsData();
    };
    TableRenderer.prototype.parseColumnsData = function () {
        // console.log("Column:",this.columns);
        var err;
        if (this.columns && typeof this.columns === "string") {
            try {
                JSON.parse(this.columns);
            }
            catch (e) {
                err = e;
            }
            if (err) {
                this.parsedColumns = '';
            }
            else {
                this.parsedColumns = JSON.parse(this.columns);
            }
        }
        else {
            this.parsedColumns = this.columns;
        }
        if (err)
            console.error("Error parssing at table renderer component:\n", "Original data:\n=============\n", this.columns, "\n=============\n", this.parsedColumns, "error:", err);
    };
    TableRenderer.prototype.editOpen = function (index) {
        if (!this.showEdition.hasOwnProperty(index))
            this.showEdition[index] = false;
        this.showEdition[index] = !this.showEdition[index];
    };
    TableRenderer.prototype.openEditInstance = function (index) {
        if (!this.openingEditInstance.hasOwnProperty(index))
            this.openingEditInstance[index] = false;
        this.openingEditInstance[index] = !this.openingEditInstance[index];
    };
    TableRenderer.prototype.getColumnData = function (item, column) {
        var path = column.path.map(function (el) { return el; });
        var value = Object.assign({}, item);
        var _loop_1 = function(i) {
            var prop = path[i];
            if (typeof prop !== "string") {
                var deppSearch = value.find(function (el) {
                    var match = true;
                    Object.keys(prop.in).forEach(function (key) {
                        if (el[key] != prop.in[key])
                            match = false;
                    });
                    return match;
                });
                if (deppSearch) {
                    value = deppSearch[prop.find];
                }
                else {
                    value = '';
                    return { value: value };
                }
            }
            else if (value.hasOwnProperty(prop)) {
                value = value[prop];
            }
            else {
                value = '';
                return { value: value };
            }
        };
        for (var i = 0; i < path.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object") return state_1.value;
        }
        return value;
    };
    TableRenderer.prototype.log = function (message) {
        console.log(message);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableRenderer.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableRenderer.prototype, "list", void 0);
    TableRenderer = __decorate([
        core_1.Component({
            selector: 'table-renderer',
            template: require('./template.html'),
        }), 
        __metadata('design:paramtypes', [])
    ], TableRenderer);
    return TableRenderer;
}());
exports.TableRenderer = TableRenderer;
//# sourceMappingURL=script.js.map