import { NodeInterface , ComponentOption } from '../interfaces';

export interface MoleculeGeneratorInterface extends NodeInterface{
  _value : Array<any>;
  _default_value : Array<any>;
  _options : {
    _molecule_types : ComponentOption,
    _show_in_sidebar : boolean,
    _use_only_childs : boolean,
    _layout : string,
    _title : string,
    _image : ComponentOption
  }
}
