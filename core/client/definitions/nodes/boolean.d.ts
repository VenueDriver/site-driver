import { Molecule } from './molecule';
import { BooleanNodeComponent } from '../../front/components/boolean/script';
import { BooleanInterface } from './../interfaces';
export declare class BooleanNode extends Molecule implements BooleanInterface {
    _ngClass: string;
    _type: string;
    _label: string;
    _ngComponent: typeof BooleanNodeComponent;
    _value: boolean;
    _instance_of: string;
    _default_value: boolean;
    _options: any;
    constructor(obj: BooleanInterface);
}
