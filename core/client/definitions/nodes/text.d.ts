import { Molecule } from './molecule';
import { TextNodeComponent } from '../../front/components/text/script';
import { TextInterface } from './../interfaces';
export declare class TextNode extends Molecule implements TextInterface {
    _ngClass: string;
    _type: string;
    _label: string;
    _ngComponent: typeof TextNodeComponent;
    _value: string;
    _instance_of: string;
    _default_value: string;
    _options: any;
    constructor(obj: TextInterface);
}
