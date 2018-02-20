import { NodeInterface } from '../interfaces';
export interface CellInterface extends NodeInterface {
    _value: (CellInterface | NodeInterface)[];
    _options: {
        _convert_array_to_keys: boolean;
        _additional_css_classes: string;
    };
}
