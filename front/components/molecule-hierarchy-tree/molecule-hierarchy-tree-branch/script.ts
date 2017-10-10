import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { HierarchyTreeInterface } from '../../../../definitions/interfaces'

@Component({
  selector: 'molecule-hierarchy-tree-branch',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeHierarchyTreeBranchComponent implements OnInit {

  ready : boolean = false;
  isArrayValue : boolean = false;
  checkedBranch : boolean = true;
  @Input() branch : HierarchyTreeInterface;
  @Input() parent : HierarchyTreeInterface;
  @Input() tree : HierarchyTreeInterface;

  @Input() checked : boolean = false;
  @Output() updated = new EventEmitter();
  @Output() selected = new EventEmitter();

  constructor(){}

  ngOnInit(){
    if(this.branch){
      this.isArrayValue = Array.isArray(this.branch._branches._value);
      this.ready = true;
      this.isBranchChecked();
    }
  }

  isBranchChecked(){
    let includedALL = this.parent._branches._all;
    let excludedBranch = this.parent._branches._exclude.find(el=> el._id === this.branch._id);
    let includedBranch = this.parent._branches._include.find(el=> el._id === this.branch._id);
    if(includedALL && excludedBranch){
      this.checkedBranch = false;
    }else if(!includedALL && !includedBranch){
      this.checkedBranch = false;
    }
  }

  ngOnChanges(){
    this.isBranchChecked();
  }


  branchSelected(branch){
    this.selected.emit(branch);
  }

  toggleAllChilds(branch){
    branch._branches._include = [];
    branch._branches._exclude = [];
    branch._branches._all = !branch._branches._all;
    this.updated.emit(this.branch);
  }

  childBranchSelected(branch){
    let targetArray = this.branch._branches[ (this.branch._branches._all) ? "_exclude" : "_include"];
    let targetIndex = null;
    targetArray.forEach((el,i)=>{ if(el._id === branch._id) targetIndex = i})
    if(!targetIndex){
      targetArray.splice(targetIndex,1);
    }else{
      targetArray.push(branch);
    }

    console.log("childBranchSelected:",this.branch);

    this.updated.emit(this.branch);
  }

  emitUpwards(eventName,ev){
    this[eventName].emit(ev);
  }

}
