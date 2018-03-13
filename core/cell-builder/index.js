"use strict";
var Plugin = require("@molecule-driver/plugin");
var cellBuilder = new Plugin({
    ngModule: 'src/app/cell-builder/module#CellBuilderModule',
    route: '/cell-builder'
});
module.exports = cellBuilder.export();
//# sourceMappingURL=index.js.map