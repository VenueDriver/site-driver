import { NodeInterface , ComponentOption , HierarchyTreeInterface } from '../interfaces';

export interface MoleculeBrowserInterface extends NodeInterface{
  _value : HierarchyTreeInterface | null;
  _default_value : Array<any>;
  _options : {
    _display_selection_ui : boolean,
    _select_multiple : boolean,
    _show_cells : boolean,
    _show_generators : boolean,
    _show_instances : boolean
  }
}
