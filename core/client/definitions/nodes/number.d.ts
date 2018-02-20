import { Molecule } from './molecule';
import { NumberNodeComponent } from '../../front/components/number/script';
import { NumberInterface } from './../interfaces';
export declare class NumberNode extends Molecule implements NumberInterface {
    _ngClass: string;
    _type: string;
    _label: string;
    _ngComponent: typeof NumberNodeComponent;
    _value: number;
    _instance_of: string;
    _default_value: number;
    _options: any;
    constructor(obj: NumberInterface);
}
