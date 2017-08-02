import { MoleculeInterface } from './interfaces';

export interface NodeInterface extends MoleculeInterface{
    _ngComponent ?: any;
    _path    : Array<number>;
    _can : {
        _edit_value : boolean;
        _edit    : boolean;
        _dragg   : boolean;
        _delete  : boolean;
        _show    : boolean;
    }
}
