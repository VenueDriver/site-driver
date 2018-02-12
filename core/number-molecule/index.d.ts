import { NumberMoleculeInterface } from './interface';
import Molecule = require('@molecule-driver/molecule');
declare class NumberMolecule extends Molecule implements NumberMoleculeInterface {
    _type: string;
    constructor(data: any);
}
export = NumberMolecule;
