import { Component , Input , OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';

@Component({
  selector: 'cell',
  template: require('./template.html')
})

export class CellComponent implements OnInit {

  @Input() data : any;
  @Input() userRole : number = 0;
  newMolecule : any;
  reduced = false;
  ready : boolean = false;

  constructor(private moleculeService : MoleculeService){

  }

  moleculeSelected(selected){
    this.newMolecule = selected[0];
  }

  ngOnInit(){
    this.ready = true;
  }


}
