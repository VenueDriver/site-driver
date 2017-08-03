import { MoleculeInterface } from '../interfaces';

export interface NodeInterface extends MoleculeInterface{
    _ngComponent ?: any;
    _ngClass ?: string;
    _path    : Array<number>;
    _can : {
        _be_required : boolean;
        _edit_value  : boolean;
        _edit    : boolean;
        _dragg   : boolean;
        _delete  : boolean;
        _show    : boolean;
    }
}
