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
var ServerService = (function () {
    function ServerService(http) {
        this.http = http;
    }
    ServerService.prototype.request = function (verb, endpoint, data, h) {
        if (data === void 0) { data = {}; }
        if (h === void 0) { h = []; }
        var formData = new FormData();
        formData.append("data", JSON.stringify(data));
        var headers = new http_1.Headers();
        h.forEach(function (head) {
            headers.append(head.name, head.value);
        });
        var options = new http_1.RequestOptions({ headers: headers });
        if (verb == "get") {
            return this.http[verb](endpoint).map(function (res) { return res.json(); });
        }
        else {
            return this.http[verb](endpoint, data, options).map(function (res) { return res.json(); });
        }
    };
    // POST TO SERVER
    ServerService.prototype.post = function (endpoint, data, headers) {
        return this.request("post", endpoint, data, headers);
    };
    // GET FROM SERVER
    ServerService.prototype.get = function (endpoint) {
        return this.request("get", endpoint);
    };
    ServerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ServerService);
    return ServerService;
}());
exports.ServerService = ServerService;
//# sourceMappingURL=server.service.js.map