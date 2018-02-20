var EmptyStorage = (function () {
    function EmptyStorage(opts) {
        var _this = this;
        this.opts = {};
        Object.keys(opts).forEach(function (key) {
            _this.opts[key] = opts[key];
        });
        this.query = Object.assign({}, opts.query);
    }
    EmptyStorage.prototype.get = function () {
        return new Promise(function (resolve, reject) {
            resolve([]);
        });
    };
    EmptyStorage.prototype.post = function () {
        return new Promise(function (resolve, reject) {
            resolve(null);
        });
    };
    EmptyStorage.prototype.remove = function () {
        return new Promise(function (resolve, reject) {
            resolve(null);
        });
    };
    return EmptyStorage;
}());
module.exports = EmptyStorage;
//# sourceMappingURL=index.js.map