import { Component , Input , OnInit } from '@angular/core';
import * as inputs from '../inputs';



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
    this.validate();
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
    this.validate();
  }

  validate(){
    console.log("TYPEOF MOLECULE",typeof this.molecule,"Molecule:",this.molecule);
    if(typeof this.molecule == 'object'){
      console.log("molecule is object");
      this.validMolecule = this.molecule.hasOwnProperty('_can');
      this.hasOptions = this.molecule.hasOwnProperty("_options");
      this.hasName = this.molecule.hasOwnProperty("_name");
      console.log("valid",this.validMolecule,"options",this.hasOptions,"name",this.hasName)
    }
  }

  isBoolean(value) : boolean{
    return typeof(value) == 'boolean';
  }

  isString(value) : boolean{
    return typeof(value) == 'string';
  }

  isComplex(value) : boolean{
    return typeof(value) == 'object' && value.hasOwnProperty("_ngComponentName");
  }

  getComponent(name){
    return inputs[name];
  }

}
