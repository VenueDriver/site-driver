import { NodeInterface, ComponentOption, HierarchyTreeInterface } from '../interfaces';
export interface MoleculeBrowserInterface extends NodeInterface {
    _value: HierarchyTreeInterface | null;
    _default_value: Array<any>;
    _options: {
        _hide_instance_values: boolean;
        _disable_top_level: boolean;
        _single_value: boolean;
        _output_branch_only: boolean;
        _root: ComponentOption;
    };
}
