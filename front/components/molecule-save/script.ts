import { Component , Input , OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';


@Component({
  selector: 'molecule-save',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class MoleculeSave implements OnInit {

  @Input() molecule : any;
  @Input() type : string;

  bussy : boolean = false;

  constructor(private moleculeService : MoleculeService){

  }

  ngOnInit(){

  }

  save(){
    this.bussy = true;
    this.moleculeService.saveMolecule(this.type,this.molecule).then((response)=>{
      this.bussy = false;
      console.log("All good saved",response);
    });
  }

}
