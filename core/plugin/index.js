"use strict";
var fs = require("fs");
var Plugin = (function () {
    function Plugin(opt) {
        this._data = {};
        this._data = {
            front: {
                ngModule: opt.ngModule,
                ngRoute: {
                    path: opt.route
                }
            }
        };
    }
    Plugin.prototype.export = function () {
        var metadata = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        this._data.name = metadata.name;
        return this._data;
    };
    return Plugin;
}());
module.exports = Plugin;
//# sourceMappingURL=index.js.map