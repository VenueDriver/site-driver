"use strict";
// IMPORT COMPONENTS
var script_1 = require("./layouts/cards-horizontal/script");
var script_2 = require("./layouts/cards-vertical/script");
var script_3 = require("./layouts/table/script");
var script_4 = require("./layouts/sidebar/script");
// ASSIGN COMPONENT TO NAME
var ngComponent = {
    'Default': script_3.GeneratorLayoutTable,
    'Table': script_3.GeneratorLayoutTable,
    'Sidebar': script_4.GeneratorLayoutSidebar,
    'Cards - Vertical': script_2.GeneratorLayoutVerticalCards,
    'Cards - Horizontal': script_1.GeneratorLayoutHorizontalCards
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: Object.keys(ngComponent),
    ngComponent: ngComponent
};
//# sourceMappingURL=layouts.js.map