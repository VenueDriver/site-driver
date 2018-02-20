import { MoleculeParser } from '../../front/helpers/molecule-parser';
import { NodeInterface } from '../interfaces/Inode';
export declare class Molecule implements NodeInterface {
    _name: string;
    _id: string;
    _instance_of: string;
    _type: string;
    _label: string;
    _value: any;
    _path: Array<number>;
    _default_value: any;
    _can: any;
    parser: MoleculeParser;
    constructor(obj: any);
    insert(obj: any): Promise<{}>;
}
