"use strict";
var server = {
    get: function (query) {
        return new Promise(function (resolve, reject) {
            resolve({ "message": "ok" });
        });
    },
    post: function (query) {
        return new Promise(function (resolve, reject) {
            resolve({ "message": "ok" });
        });
    },
    delete: function (query) {
        return new Promise(function (resolve, reject) {
            resolve({ "message": "ok" });
        });
    }
};
module.exports = server;
//# sourceMappingURL=index.js.map