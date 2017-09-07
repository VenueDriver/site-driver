import { Component , Input , OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'cell',
  template: require('./template.html')
})

export class CellComponent implements OnInit {

  @Input() data : any;
  isDeveloper : boolean = false;
  newMolecule : any;
  reduced = false;
  ready : boolean = false;

  constructor(private moleculeService : MoleculeService, private dataService : DataService){

  }

  moleculeSelected(selected){
    this.newMolecule = Object.assign({},selected[0]);
  }

  ngOnInit(){
    this.dataService.userRole().then((data)=>{
      this.isDeveloper = (<any>data).role > 9000;
    })
  }

  resetMolecule(event){
    this.moleculeSelected(this.newMolecule);
  }


}
