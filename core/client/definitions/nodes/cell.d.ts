import { Molecule } from './molecule';
import { CellComponent } from '../../front/components/cell/script';
import { CellInterface } from './../interfaces';
import { NodeInterface } from '../interfaces/Inode';
export declare class Cell extends Molecule implements CellInterface {
    _ngClass: string;
    _type: string;
    _label: string;
    _name: string;
    _ngComponent: typeof CellComponent;
    _value: (CellInterface | NodeInterface)[];
    _instance_of: string;
    _default_value: (CellInterface | NodeInterface)[];
    _options: any;
    constructor(obj: CellInterface);
}
