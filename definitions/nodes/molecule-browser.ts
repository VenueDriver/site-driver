import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { MoleculeSelect } from '../../front/components/molecule-select/script'; // IMPORT NG COMPONENT
import { MoleculeBrowserComponent } from '../../front/components/molecule-browser/script'; // IMPORT NG COMPONENT
import { MoleculeBrowserInterface , ComponentOption} from './../interfaces'; // IMPORT INTERFACE


export class MoleculeBrowser extends Molecule implements MoleculeBrowserInterface{

  // THIS CLASS NAME
  _ngClass : string = "MoleculeBrowser";
  _type : string = "browser";
  _label : string = "Molecule Browser";
  _name : string = "MoleculeBrowser";
  _ngComponent = MoleculeBrowserComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : Array<any> = [];
  _instance_of : string = '';
  _default_value : Array<any> = [];
  _options = {
    _display_selection_ui : true,
    _select_multiple : true,
    _show_cells : false,
    _show_generators : true,
    _show_instances : true
  };


  constructor(obj : MoleculeBrowserInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
