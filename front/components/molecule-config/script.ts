import { Component , Input , OnInit } from '@angular/core';
import * as nodes from '../../../definitions/nodes';



@Component({
  selector: 'molecule-config',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class MoleculeConfig implements OnInit {

  @Input() molecule : any;
  validMolecule : boolean;
  hasOptions : boolean;
  hasName : boolean;

  ngOnInit(){
    this.resetValidation();
  }

  resetValidation(){
    this.validMolecule = false;
    this.hasOptions = false;
    this.hasName = false;
  }

  canChange(key){
    this.molecule._can[key] = !this.molecule._can[key];
  }

  optionsChange(key){
    if(typeof this.molecule._options[key] == "boolean"){
      this.molecule._options[key] = !this.molecule._options[key];
    }
  }

  ngOnChanges(){
    this.resetValidation();
    if(typeof this.molecule == 'object'){
      this.validMolecule = this.molecule.hasOwnProperty('_can');
      this.hasOptions = this.molecule.hasOwnProperty("_options");
      this.hasName = this.molecule.hasOwnProperty("_name");
    }
  }

  isBoolean(value) : boolean{
    return typeof(value) == 'boolean';
  }

  isString(value) : boolean{
    return typeof(value) == 'string';
  }

  isComplex(value) : boolean{
    return typeof(value) == 'object' && value.hasOwnProperty("_ngInput");
  }

}
