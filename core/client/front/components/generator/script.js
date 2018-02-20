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
var GeneratorComponent = (function () {
    function GeneratorComponent(dataService) {
        this.dataService = dataService;
        this.panel = false;
        this.defaultValues = false;
        this.edit = false;
        this.noModal = false;
        this.disableType = false;
        this.restoreDefault();
    }
    GeneratorComponent.prototype.restoreDefault = function () {
        this.value = "";
        this.type = "";
        this.name = "";
        this.required = false;
        this.editable_value = true;
        this.editable_field = false;
        this.delete_field = false;
        this.visible_field = true;
        this.use_textarea = false;
        this.filter = { venues: [], artists: [] };
        this.useComponents = [];
        this.columns = 12;
    };
    GeneratorComponent.prototype.setValues = function (data) {
        data = Object.assign({}, data);
        this.value = (data.hasOwnProperty("_value")) ? data._value : this.value;
        this.type = (data.hasOwnProperty("_type")) ? data._type : this.type;
        this.name = (data.hasOwnProperty("_name")) ? data._name : this.name;
        this.required = (data.hasOwnProperty("_required")) ? data._required : this.required;
        this.editable_value = (data.hasOwnProperty("_editable_value")) ? data._editable_value : this.editable_value;
        this.editable_field = (data.hasOwnProperty("_editable_field")) ? data._editable_field : this.editable_field;
        this.delete_field = (data.hasOwnProperty("_delete_field")) ? data._delete_field : this.delete_field;
        this.visible_field = (data.hasOwnProperty("_visible_field")) ? data._visible_field : this.visible_field;
        this.filter = (data.hasOwnProperty("_filter")) ? data._filter : this.filter;
        this.components = (data.hasOwnProperty("_useComponents")) ? data._useComponents : this.useComponents;
        this.useComponents = (data.hasOwnProperty("_useComponents")) ? data._useComponents : this.useComponents;
        this.columns = (data.hasOwnProperty("_columns")) ? data._columns : this.columns;
        this.use_textarea = (data.hasOwnProperty("_use_textarea")) ? data._use_textarea : this.use_textarea;
    };
    GeneratorComponent.prototype.showPanel = function () {
        if (this.noModal && this.components.length === 1) {
            if (this.defaultValues) {
                this.setValues(this.defaultValues);
            }
            this.type = this.components[0];
            this.save();
        }
        else {
            if (this.edit) {
                this.setValues(this.edit);
            }
            this.panel = true;
        }
    };
    GeneratorComponent.prototype.hidePanel = function () {
        this.panel = false;
        this.restoreDefault();
    };
    GeneratorComponent.prototype.onKey = function (event) {
        this.name = event.target.value.replace(/(\s+|\-)/gi, "_").toLowerCase();
    };
    GeneratorComponent.prototype.save = function () {
        var _this = this;
        if (this.noModal)
            this.delete_field = true;
        this.validate().then(function (errors) {
            if (errors.length < 1) {
                var newData = {
                    _name: _this.name,
                    _typeComponent: _this.type,
                    _required: _this.required,
                    _editable_value: _this.editable_value,
                    _editable_field: _this.editable_field,
                    _delete_field: _this.delete_field,
                    _visible_field: _this.visible_field
                };
                if (_this.value)
                    newData._value = _this.value;
                if (_this.type == "Group")
                    newData._columns = _this.columns;
                if (_this.type == "Text")
                    newData._use_textarea = _this.use_textarea;
                if (['Event', 'Slider', 'Slide'].indexOf(_this.type) > -1)
                    newData._filter = _this.filter;
                if (_this.type == "List")
                    newData._useComponents = _this.useComponents;
                if (_this.edit) {
                    newData._child = _this.edit._child;
                    _this.dataService.update(_this.path, newData);
                    _this.hidePanel();
                }
                else {
                    _this.dataService.post(_this.path, newData);
                    _this.hidePanel();
                }
            }
            else {
                alert(errors.join('\n'));
            }
        });
    };
    GeneratorComponent.prototype.setVenueFilter = function (list) {
        this.filter.venues = list.map(function (el) { return el.id; });
    };
    GeneratorComponent.prototype.setArtistFilter = function (list) {
        this.filter.artists = list.map(function (el) { return el.id; });
    };
    GeneratorComponent.prototype.setTypeList = function (list) {
        this.useComponents = list;
    };
    GeneratorComponent.prototype.validate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var errors = [];
            var path = _this.path.map(function (el) { return el; });
            if (_this.edit) {
                path.pop();
            }
            var siblings = _this.dataService.findParent(path)._child;
            var existsName = false;
            siblings.forEach(function (el) {
                if (el._name === _this.name) {
                    if (_this.edit) {
                        if (el._name !== _this.edit._name) {
                            existsName = true;
                        }
                    }
                    else {
                        existsName = true;
                    }
                }
            });
            if (_this.noName !== true) {
                if (existsName) {
                    errors.push("'" + _this.name + "' already exists on this group.");
                }
                if (_this.name.search(/^[a-zA-Z0-9_]+$/) == -1) {
                    errors.push("'" + _this.name + "' contains invalid characters. Only alphanumeric and underscores allowed.");
                }
                if ((/^\_/).test(_this.name)) {
                    errors.push("First charcter of name can not be underscore '_'.");
                }
            }
            resolve(errors);
        });
    };
    GeneratorComponent.prototype.ngOnInit = function () {
        if (this.edit) {
            this.restoreDefault();
            this.disableType = true;
            this.setValues(this.edit);
        }
    };
    GeneratorComponent.prototype.testlog = function (log) { console.log(log); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GeneratorComponent.prototype, "noName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GeneratorComponent.prototype, "defaultValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GeneratorComponent.prototype, "components", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GeneratorComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GeneratorComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GeneratorComponent.prototype, "edit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GeneratorComponent.prototype, "noModal", void 0);
    GeneratorComponent = __decorate([
        core_1.Component({
            selector: 'generator',
            template: require('./template.html'),
            styles: [require('./styles.css')],
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], GeneratorComponent);
    return GeneratorComponent;
}());
exports.GeneratorComponent = GeneratorComponent;
//# sourceMappingURL=script.js.map