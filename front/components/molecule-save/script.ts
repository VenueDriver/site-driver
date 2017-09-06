import { Component , Input , OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';


@Component({
  selector: 'molecule-save',
  template: require('./template.html'),
  styles : [require('./styles.css')]
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
    this.molecule._type = this.type;
    console.log("molecule-save ",this.molecule,this.type);
    this.moleculeService.saveMolecule({
      type : this.type,
      name : this.molecule._name,
      id   : this.molecule._id,
      data : this.molecule
    }).then((response)=>{
      this.bussy = false;
      console.log("All good saved",response);
    });
  }

}
