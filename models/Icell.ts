import { NodeInterface } from './interfaces';

export interface CellInterface extends NodeInterface {
    _value : (CellInterface|NodeInterface)[];
}
