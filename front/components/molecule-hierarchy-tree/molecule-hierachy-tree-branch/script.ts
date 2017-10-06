import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { HierarchyTreeInterface } from '../../../../definitions/interfaces'

@Component({
  selector: 'molecule-hierarchy-tree-branch',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeHierarchyTreeBranchComponent implements OnInit {

  ready : boolean = false;
  @Input() branch : HierarchyTreeInterface;

  constructor(){}

  ngOnInit(){
    if(this.branch){
      this.ready = true;
    }
  }

}
