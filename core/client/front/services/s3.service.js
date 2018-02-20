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
var http_1 = require('@angular/http');
require('rxjs/Rx');
var asyncLoop = function (condition, work, end) {
    if (condition()) {
        end();
    }
    else {
        work(function () { return asyncLoop(condition, work, end); }, end);
    }
};
var S3Service = (function () {
    function S3Service(http) {
        this.http = http;
    }
    S3Service.prototype.ngOnInit = function () {
    };
    S3Service.prototype._connect = function (url, data, h) {
        var headers = new http_1.Headers();
        h.forEach(function (head) {
            headers.append(head.name, head.value);
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, data, options)
            .map(function (res) { return res.json(); });
    };
    // LIST FILES AND FOLDERS
    S3Service.prototype.folder = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connect("/media/s3/list", { path: path }, [
                { name: "Content-Type", value: "application/json" }
            ]).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    // CREATE FOLDER
    // ADD FILES
    S3Service.prototype.create = function (path, file) {
        var _this = this;
        if (file === void 0) { file = false; }
        return new Promise(function (resolve, reject) {
            var url = "/media/s3/add/folder";
            var headers = [];
            var data = { path: path };
            if (file) {
                url = "/media/s3/add/file";
                data._file = file;
                data._folder = path;
                var formData_1 = new FormData();
                Object.keys(data).forEach(function (key) {
                    formData_1.append(key, data[key]);
                });
                data = formData_1;
            }
            else {
                headers.push({ name: "Content-Type", value: "application/json" });
            }
            _this._connect(url, data, headers).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    // DELETE FILES
    S3Service.prototype.delete = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._connect("/media/s3/remove", { path: path }, [
                { name: "Content-Type", value: "application/json" }
            ]).subscribe(function (data) {
                resolve(data);
            });
        });
    };
    S3Service = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], S3Service);
    return S3Service;
}());
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map