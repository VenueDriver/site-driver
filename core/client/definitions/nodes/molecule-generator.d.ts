import { Molecule } from './molecule';
import { MoleculeGeneratorComponent } from '../../front/components/molecule-generator/script';
import { MoleculeGeneratorInterface } from './../interfaces';
export declare class MoleculeGenerator extends Molecule implements MoleculeGeneratorInterface {
    _ngClass: string;
    _type: string;
    _label: string;
    _name: string;
    _ngComponent: typeof MoleculeGeneratorComponent;
    _value: Array<any>;
    _instance_of: string;
    _default_value: Array<any>;
    _options: {
        _molecule_types: {
            _options: {
                max: number;
            };
            _ngComponentName: string;
            _value: never[];
        };
        _use_only_childs: boolean;
        _show_in_sidebar: boolean;
        _layout: string;
        _columns: string;
        _title: string;
        _image: {
            _options: {
                _allow_videos: boolean;
                _allow_images: boolean;
                _allow_documents: boolean;
            };
            _ngComponentName: string;
            _value: string;
        };
    };
    constructor(obj: MoleculeGeneratorInterface);
}
