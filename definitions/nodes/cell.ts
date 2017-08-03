import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { CellComponent } from '../../front/components/cell/script'; // IMPORT NG COMPONENT
import { CellInterface } from './../interfaces'; // IMPORT INTERFACE

export class Cell extends Molecule {

  // THIS CLASS NAME
  _ngClass : string = "Cell";
  _ngComponent = CellComponent;

  constructor(obj : CellInterface) {

    super(obj);

  }

}
