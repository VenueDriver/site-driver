import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { MoleculeSelect } from '../../front/components/molecule-select/script'; // IMPORT NG COMPONENT
import { MoleculeGeneratorComponent } from '../../front/components/molecule-generator/script'; // IMPORT NG COMPONENT
import { MoleculeGeneratorInterface } from './../interfaces'; // IMPORT INTERFACE


export class MoleculeGenerator extends Molecule implements MoleculeGeneratorInterface{

  // THIS CLASS NAME
  _ngClass : string = "MoleculeGenerator";
  _ngComponent = MoleculeGeneratorComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : Array<any> = [];
  _default_value : Array<any> = [];
  _options = {
    _molecule_types : {
      _ngClass : 'MoleculeSelect',
      _ngComponent : MoleculeSelect,
      _value : []
    },
    _use_only_childs : true,
    _layout : 'Table',
    _structure : 'Single Project'
  };


  constructor(obj : MoleculeGeneratorInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
