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
    _molecule_types : {
      _options : {
        max : -1
      },
      _ngComponentName : 'MoleculeSelect',
      _value : []
    },
    _use_only_childs : true,
    _show_in_sidebar : false,
    _layout : '',
    _columns : '',
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


  constructor(obj : MoleculeBrowserInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
