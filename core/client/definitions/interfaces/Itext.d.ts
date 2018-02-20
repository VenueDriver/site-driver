import { NodeInterface } from '../interfaces';
export interface TextInterface extends NodeInterface {
    _value: string;
    _default_value: string;
    _options: {
        _use_textarea: boolean;
        _additional_css_classes: string;
    };
}
