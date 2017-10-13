import { NodeInterface , ComponentOption , HierarchyTreeInterface } from '../interfaces';

export interface MoleculeBrowserInterface extends NodeInterface{
  _value : HierarchyTreeInterface | null;
  _default_value : Array<any>;
  _options : {
    _display_selection_ui : boolean,
    _single_value : boolean,
    _output_branch_only : boolean,
    _root : ComponentOption
  }
}
