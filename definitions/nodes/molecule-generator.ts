import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { MoleculeSelect } from '../../front/components/molecule-select/script'; // IMPORT NG COMPONENT
import { MoleculeGeneratorComponent } from '../../front/components/molecule-generator/script'; // IMPORT NG COMPONENT
import { MoleculeGeneratorInterface , ComponentOption} from './../interfaces'; // IMPORT INTERFACE


export class MoleculeGenerator extends Molecule implements MoleculeGeneratorInterface{

  // THIS CLASS NAME
  _ngClass : string = "MoleculeGenerator";
  _type : string = "generator";
  _label : string = "Molecule Generator";
  _name : string = "MoleculeGenerator";
  _ngComponent = MoleculeGeneratorComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : Array<any> = [];
  _default_value : Array<any> = [];
  _options = {
    _molecule_types : {
      _options : {
        max : -1
      },
      _ngComponentName : 'MoleculeSelect',
      _value : []
    },
    _use_only_childs : true,
    _layout : '',
    _title : '',
    _image : {
      _options : {
        _allow_videos : false,
        _allow_images : true,
        _allow_documents : false
      },
      _ngComponentName : 'FileNodeComponent',
      _value : ''
    }
  };


  constructor(obj : MoleculeGeneratorInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
