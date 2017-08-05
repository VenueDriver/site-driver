import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { CellComponent } from '../../front/components/cell/script'; // IMPORT NG COMPONENT
import { CellInterface } from './../interfaces'; // IMPORT INTERFACE
import { NodeInterface } from '../interfaces/Inode';


export class Cell extends Molecule implements CellInterface {

  // THIS CLASS NAME
  _ngClass : string = "Cell";
  _ngComponent = CellComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : (CellInterface|NodeInterface)[] ;
  _default_value : (CellInterface|NodeInterface)[] ;

  constructor(obj : CellInterface) {

    super(obj);

  }

}
