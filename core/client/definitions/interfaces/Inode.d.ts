import { MoleculeInterface, MoleculeGeneratorInterface } from '../interfaces';
export interface NodeInterface extends MoleculeInterface {
    _ngComponent?: any;
    _ngClass?: string;
    _generator?: MoleculeGeneratorInterface;
    _path: Array<number>;
    _instance_of: string;
    _can: {
        _be_required: boolean;
        _edit_value: boolean;
        _edit: boolean;
        _dragg: boolean;
        _delete: boolean;
        _show: boolean;
    };
}
