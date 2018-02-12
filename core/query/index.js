"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(require.resolve("chai"));
var TestStorage = (function () {
    function TestStorage(query) {
        this.query = query;
    }
    TestStorage.prototype.get = function () {
        return new Promise(function (resolve, reject) {
            resolve("OK");
        });
    };
    TestStorage.prototype.post = function () {
        return new Promise(function (resolve, reject) {
            resolve("OK");
        });
    };
    TestStorage.prototype.remove = function () {
        return new Promise(function (resolve, reject) {
            resolve("OK");
        });
    };
    return TestStorage;
}());
module.exports = TestStorage;
//# sourceMappingURL=index.js.map