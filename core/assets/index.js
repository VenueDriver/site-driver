"use strict";
var path = require('path');
var parseUrl = require('parseurl');
var assets = function (req, res, next) {
    var target = parseUrl(req).pathname;
    if (/^\/molecule\-assets/.test(target)) {
        var modules_directory = path.join(require.resolve("@molecule-driver/molecule"), '/../../');
        res.sendFile(path.join(modules_directory, target.replace("/molecule-assets", "")));
    }
    else {
        next();
    }
};
var wrapper = function (opts) {
    return assets;
};
module.exports = wrapper;
//# sourceMappingURL=index.js.map