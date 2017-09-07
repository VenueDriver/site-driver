import { Component , Input , OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';


@Component({
  selector: 'molecule-remove',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeRemove implements OnInit {

  @Input() molecule : any;
  @Input() type : string;

  bussy : boolean = false;

  constructor(private moleculeService : MoleculeService){

  }

  ngOnInit(){

  }

  remove(){
    this.bussy = true;
    console.log("Remove ",this.molecule);
    this.moleculeService.removeMolecule(this.molecule).then((response)=>{
      this.bussy = false;
    });
  }

}
