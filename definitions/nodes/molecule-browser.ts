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
    _display_selection_ui : true,
    _single_value : false,
    _output_branch_only : false

  };


  constructor(obj : MoleculeBrowserInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
