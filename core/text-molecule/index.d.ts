import { TextMoleculeInterface } from './interface';
import Molecule = require('@molecule-driver/molecule');
declare class TextMolecule extends Molecule implements TextMoleculeInterface {
    _type: string;
    constructor(data: any);
}
export = TextMolecule;
