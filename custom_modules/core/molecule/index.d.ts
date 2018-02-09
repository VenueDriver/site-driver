import { MoleculeInterface } from './interface';
declare class Molecule implements MoleculeInterface {
    _name: string;
    _id: string;
    _type: string;
    _value: any;
    constructor(data: any);
}
export = Molecule;
