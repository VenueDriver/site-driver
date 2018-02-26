"use strict";
var path = require("path");
var client = {
    app: function (req, res) {
        var location = require.resolve('@molecule-driver/molecule');
        res.sendFile(path.join(location, '/../../', '/client/public/js', 'index.html'));
    }
};
module.exports = client;
//# sourceMappingURL=index.js.map