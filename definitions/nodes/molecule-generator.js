"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var molecule_1 = require('./molecule'); // IMPORT NODE CLASS
var script_1 = require('../../front/components/molecule-generator/script'); // IMPORT NG COMPONENT
var MoleculeGenerator = (function (_super) {
    __extends(MoleculeGenerator, _super);
    function MoleculeGenerator(obj) {
        _super.call(this, obj);
        // THIS CLASS NAME
        this._ngClass = "MoleculeGenerator";
        this._type = "generator";
        this._label = "Molecule Generator";
        this._name = "MoleculeGenerator";
        this._ngComponent = script_1.MoleculeGeneratorComponent;
        // OVERRIDES SPECIFIC TO THIS CLASS
        this._value = [];
        this._instance_of = '';
        this._default_value = [];
        this._options = {
            _molecule_types: {
                _options: {
                    max: -1
                },
                _ngComponentName: 'MoleculeSelect',
                _value: []
            },
            _use_only_childs: true,
            _show_in_sidebar: false,
            _layout: '',
            _columns: '',
            _title: '',
            _image: {
                _options: {
                    _allow_videos: false,
                    _allow_images: true,
                    _allow_documents: false
                },
                _ngComponentName: 'FileNodeComponent',
                _value: ''
            }
        };
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    return MoleculeGenerator;
}(molecule_1.Molecule));
exports.MoleculeGenerator = MoleculeGenerator;
//# sourceMappingURL=molecule-generator.js.map