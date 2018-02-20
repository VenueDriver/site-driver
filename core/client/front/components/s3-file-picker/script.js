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
var s3_service_1 = require('../../services/s3.service');
var asyncLoop = function (condition, work, end) {
    if (condition()) {
        end();
    }
    else {
        work(function () { return asyncLoop(condition, work, end); }, end);
    }
};
var S3FilePicker = (function () {
    function S3FilePicker(s3) {
        this.s3 = s3;
        this.panel = false;
        this.loading = true;
        this.dir = { _files: [] };
        this.path = ["/"];
        this.newFolderInput = false;
        this.mobileFolders = false;
        this.fileSelected = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.accept = [];
        this.maxfiles = 1;
        this.current = this.dir;
    }
    S3FilePicker.prototype.ngOnInit = function () {
        var _this = this;
        this.openFolder().then(function () {
            console.log("current", _this.current);
        });
    };
    S3FilePicker.prototype.openFolder = function (name) {
        var _this = this;
        if (name === void 0) { name = false; }
        this.mobileHideFolders();
        return new Promise(function (resolve, reject) {
            _this.loading = true;
            if (name)
                _this.path.push(name);
            _this.current = (name) ? _this.current[name] : _this.current;
            _this.s3.folder(_this.path.join('')).then(function (folder) {
                _this.current._files = [];
                folder.forEach(function (item) {
                    item = item;
                    if (/\.\w+$/.test(item)) {
                        var extension = item.match(/\.\w+$/)[0];
                        var acceptedFormat = true;
                        if (_this.accept.length > 0) {
                            acceptedFormat = _this.accept.indexOf(extension) > -1;
                        }
                        if (acceptedFormat) {
                            _this.current._files.push({
                                path: _this.path.join('') + item,
                                src: "//s3-us-west-1.amazonaws.com/assets.portaldriver.com" + _this.path.join('') + item,
                                ext: extension,
                                isImage: ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"].indexOf(extension) > -1),
                                name: item,
                                selected: false
                            });
                        }
                    }
                    else if (/\/$/.test(item)) {
                        if (item !== "_files") {
                            _this.current[item] = { _files: [] };
                        }
                    }
                });
                _this.loading = false;
                resolve(_this.path);
            });
        });
    };
    S3FilePicker.prototype.refresh = function () {
        return this.openFolder();
    };
    S3FilePicker.prototype.goToFolder = function (index) {
        this.path = this.path.filter(function (el, i) { return i <= index; });
        return this.refresh();
    };
    S3FilePicker.prototype.selected = function () {
        return this.current._files.filter(function (el) { return el.selected; });
    };
    S3FilePicker.prototype.unselectAll = function () {
        this.current._files.map(function (file) {
            file.selected = false;
            return file;
        });
    };
    S3FilePicker.prototype.selectAll = function () {
        this.current._files.map(function (file) {
            file.selected = true;
            return file;
        });
    };
    S3FilePicker.prototype.selectFile = function (file) {
        if (!file.selected) {
            if (this.selected().length < this.maxfiles) {
                file.selected = !file.selected;
            }
            else if (this.maxfiles === 1) {
                this.unselectAll();
                file.selected = !file.selected;
            }
        }
        else {
            file.selected = !file.selected;
        }
    };
    S3FilePicker.prototype.save = function () {
        this.fileSelected.emit(this.selected());
    };
    S3FilePicker.prototype.cancel = function () {
        this.close.emit(true);
    };
    S3FilePicker.prototype.fileChange = function (event) {
        var _this = this;
        var fileList = event.target.files;
        this.loading = true;
        var i = 0;
        asyncLoop(function () { return i >= fileList.length; }, function (next, end) {
            var file = fileList[i];
            _this.s3.create(_this.path.join(''), file).then(function (data) {
                i++;
                next();
            });
        }, function () {
            _this.loading = false;
            _this.refresh();
        });
        this.loading = true;
    };
    S3FilePicker.prototype.sanitizeFolderName = function (name, i) {
        var _this = this;
        if (i === void 0) { i = 1; }
        var clean = true;
        name = name.replace(/\s+/gi, "_");
        if (name === "_files")
            name = "files";
        Object.keys(this.current).forEach(function (folder) {
            if (folder !== "_files") {
                if (folder.replace(/\/$/, '') === name) {
                    clean = false;
                    name = name.replace(/\(\d+\)$/, '');
                    name = name + "(" + i + ")";
                }
                ;
                if (!clean) {
                    name = _this.sanitizeFolderName(name, i + 1);
                }
            }
        });
        return name;
    };
    S3FilePicker.prototype.newFolder = function () {
        var _this = this;
        this.loading = true;
        this.s3.create(this.path.join('') + this.sanitizeFolderName(this.newFolderName)).then(function (err) {
            _this.newFolderName = "";
            _this.loading = false;
            _this.resetFolderInput();
            _this.refresh();
        });
    };
    S3FilePicker.prototype.resetFolderInput = function () {
        this.newFolderInput = false;
        this.newFolderName = '';
    };
    // DELETE FILES
    S3FilePicker.prototype.deleteSelected = function () {
        var _this = this;
        var confirmDelete = confirm("Are you sure you want to delete the selected files?");
        if (confirmDelete) {
            this.loading = true;
            var i_1 = 0;
            asyncLoop(function () { return i_1 >= _this.selected().length; }, function (next, end) {
                _this.s3.delete(_this.selected()[i_1].path).then(function () {
                    i_1++;
                    next();
                });
            }, function () {
                _this.loading = false;
                _this.refresh();
            });
        }
    };
    S3FilePicker.prototype.mobileShowFolders = function () {
        this.mobileFolders = true;
    };
    S3FilePicker.prototype.mobileHideFolders = function () {
        this.mobileFolders = false;
    };
    S3FilePicker.prototype.mobileToggleFolders = function () {
        this.mobileFolders = !this.mobileFolders;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], S3FilePicker.prototype, "fileSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], S3FilePicker.prototype, "close", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], S3FilePicker.prototype, "accept", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], S3FilePicker.prototype, "maxfiles", void 0);
    S3FilePicker = __decorate([
        core_1.Component({
            selector: 's3-file-picker',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [s3_service_1.S3Service])
    ], S3FilePicker);
    return S3FilePicker;
}());
exports.S3FilePicker = S3FilePicker;
//# sourceMappingURL=script.js.map