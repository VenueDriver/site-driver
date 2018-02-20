"use strict";
var script_1 = require("../pages/site/script");
var script_2 = require("../pages/index/script");
var script_3 = require("../pages/cell-builder/script");
var script_4 = require("../pages/molecule-generator/script");
var script_5 = require("../pages/generator/script");
var script_6 = require("../pages/instance/script");
module.exports = [
    { path: '', component: script_2.IndexPage },
    { path: 'site/:domain', component: script_1.SitePage },
    { path: 'cell-builder', component: script_3.CellBuilder },
    { path: 'molecule-generator', component: script_4.MoleculeGenerator },
    { path: 'generator/:generator_name', component: script_5.GeneratorPage },
    { path: 'instance/:id', component: script_6.InstancePage }
];
//# sourceMappingURL=routes.js.map