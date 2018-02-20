import { Molecule } from './molecule';
import { MoleculeBrowserComponent } from '../../front/components/molecule-browser/script';
import { MoleculeBrowserInterface, HierarchyTreeInterface } from './../interfaces';
export declare class MoleculeBrowser extends Molecule implements MoleculeBrowserInterface {
    _ngClass: string;
    _type: string;
    _label: string;
    _name: string;
    _ngComponent: typeof MoleculeBrowserComponent;
    _value: HierarchyTreeInterface | null;
    _instance_of: string;
    _default_value: Array<any>;
    _options: {
        _single_value: boolean;
        _hide_instance_values: boolean;
        _disable_top_level: boolean;
        _output_branch_only: boolean;
        _root: {
            _options: {
                single_value: boolean;
                output_branch_only: boolean;
            };
            _ngComponentName: string;
            _value: null;
        };
    };
    constructor(obj: MoleculeBrowserInterface);
}
