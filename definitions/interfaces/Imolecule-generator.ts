import { NodeInterface } from '../interfaces';

export interface MoleculeGeneratorInterface extends NodeInterface{
  _value : Array<any>;
  _default_value : Array<any>;
  _options : {
    _molecule_types : {
      _ngClass ?: string,
      _ngComponent ?: any,
      _value : Array<any>
    },
    _use_only_childs : boolean,
    _layout : string,
    _structure : string
  }
}
