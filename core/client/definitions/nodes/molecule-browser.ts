import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { MoleculeSelect } from '../../front/components/molecule-select/script'; // IMPORT NG COMPONENT
import { MoleculeBrowserComponent } from '../../front/components/molecule-browser/script'; // IMPORT NG COMPONENT
import { MoleculeBrowserInterface , ComponentOption, HierarchyTreeInterface} from './../interfaces'; // IMPORT INTERFACE


export class MoleculeBrowser extends Molecule implements MoleculeBrowserInterface{

  // THIS CLASS NAME
  _ngClass : string = "MoleculeBrowser";
  _type : string = "browser";
  _label : string = "Molecule Browser";
  _name : string = "MoleculeBrowser";
  _ngComponent = MoleculeBrowserComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : HierarchyTreeInterface | null = null;
  _instance_of : string = '';
  _default_value : Array<any> = [];
  _options = {
    _single_value : false,
    _hide_instance_values : false,
    _disable_top_level : false,
    _output_branch_only : false,
    _root : {
      _options : {
        single_value : false,
        output_branch_only : false
      },
      _ngComponentName : 'MoleculeHierarchyTreeComponent',
      _value : null
    }
  };


  constructor(obj : MoleculeBrowserInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
