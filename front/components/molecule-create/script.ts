import {
    Component,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';

// Helper component to add dynamic components
@Component({
  selector: 'molecule-create',
  template: require('./template.html')
})

export class MoleculeCreate {

  @Input() type : string;
  @Input() generator : any;
  @Input() useMolecules : Array<string>;
  newMolecule : any;

  constructor(){

  }

  updateMolecule(molecules){
    this.newMolecule = molecules[0];
    console.log("This Molecule:",this.newMolecule);
    if(this.generator){
      this.newMolecule._generator = this.generator;
      this.newMolecule._id = '';
    }
  }

  log(message){
    console.log(message);
  }

}
