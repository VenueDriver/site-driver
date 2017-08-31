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

  list : Array<any>;

  selectedMolecules : Array<any>;
  name : string;
  layout : string;
  structure : string;
  use_only_childs : boolean = true;



  constructor(){}

  ngOnInit() {

  }

}
