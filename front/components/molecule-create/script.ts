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
  @Input() useMolecules : Array<string>;
  newMolecule : any;

  constructor(){

  }

  log(message){
    console.log(message);
  }

}
