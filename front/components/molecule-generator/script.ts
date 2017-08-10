import { Component , OnInit, Input } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MoleculeGeneratorInterface } from '../../../definitions/interfaces';

@Component({
  selector: 'molecule-generator',
  template: require('./template.html'),
  styles : [`
    table{ width: 100% }
    tr {
      background:#fff;
      border: 1px solid #ccc;
    }
    td {
      padding:10px;
    }
    thead td{
      font-weight:bold;
    }
    `]
})

export class MoleculeGeneratorComponent implements OnInit {

  @Input() moleculeType : string;

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



  constructor(
    private route: ActivatedRoute ,
    private router: Router
  ) {}

  ngOnInit() {

  }

}
