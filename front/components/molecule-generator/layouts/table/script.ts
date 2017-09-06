import { Component , OnInit, Input } from '@angular/core';

@Component({
  selector: 'generator-layout-table',
  template: require('./template.html'),
})

export class GeneratorLayoutTable implements OnInit {

  @Input() data : any;
  @Input() instances : any;

  ready : boolean = false;
  userRole : number = 0;
  savingData = false;
  editingList : any = {};

  show_new_molecule_form : boolean = false;
  show_generator_edit_form : boolean = false;

  list : Array<any>;

  selectedMolecules : Array<any>;
  name : string;
  layout : string;
  structure : string;
  use_only_childs : boolean = true;



  constructor(){}

  ngOnInit() {
    console.log("INSTANCES",this.instances);
    this.ready = true;
  }

}
