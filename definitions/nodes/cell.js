"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var molecule_1 = require('./molecule'); // IMPORT NODE CLASS
var script_1 = require('../../front/components/cell/script'); // IMPORT NG COMPONENT
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell(obj) {
        _super.call(this, obj);
        // THIS CLASS NAME
        this._ngClass = "Cell";
        this._ngComponent = script_1.CellComponent;
    }
    return Cell;
}(molecule_1.Molecule));
exports.Cell = Cell;
//# sourceMappingURL=cell.js.map