"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var molecule_1 = require('./molecule'); // IMPORT NODE CLASS
var script_1 = require('../../front/components/file/script'); // IMPORT NG COMPONENT
var FileNode = (function (_super) {
    __extends(FileNode, _super);
    function FileNode(obj) {
        _super.call(this, obj);
        // THIS CLASS NAME
        this._ngClass = "FileNode";
        this._type = "file";
        this._label = "File";
        this._ngComponent = script_1.FileNodeComponent;
        // OVERRIDES SPECIFIC TO THIS CLASS
        this._value = '';
        this._instance_of = '';
        this._options = {
            _allow_videos: false,
            _allow_images: true,
            _allow_documents: false,
            _additional_css_classes: ''
        };
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    return FileNode;
}(molecule_1.Molecule));
exports.FileNode = FileNode;
//# sourceMappingURL=file.js.map