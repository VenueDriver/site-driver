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

  @Output() selected = new EventEmitter();

  @Output() treeUpdated = new EventEmitter();

  constructor(){

  }

  branchChanged(branch : HierarchyTreeInterface){
    this.treeUpdated.emit(branch);
  }

  ngOnInit(){
    if(this.branch){
      this.isArrayValue = Array.isArray(this.branch._branches._value);
      this.ready = true;
    }
  }

  checkBoxClicked(current_state){
    this.selected.emit(current_state);
  }

  childChecked(branch){
    if(this.checked){
      let targetArray = this.branch._branches[ (this.branch._branches._all) ? "_exclude" : "_include"];
      let targetIndex = null;
      targetArray.forEach((el,i)=>{
        if(el._id === branch._id){
        targetIndex = i
        }
      });
      if(targetIndex != null){
        targetArray.splice(targetIndex,1);
      }else{
        targetArray.push(branch);
      }
      this.updateChilds();
    }
    this.branchChanged(this.branch);
  }

  isBranchChecked(child,parent){
    let includedALL = this.branch._branches._all;
    let excludedBranch = this.branch._branches._exclude.find(el=> el._id === child._id);
    let includedBranch = this.branch._branches._include.find(el=> el._id === child._id);
    if(includedALL && excludedBranch){
      child._checked = false;
    }else if(!includedALL && !includedBranch){
      child._checked = false;
    }else{
      child._checked = true;
    }
    return child;
  }

  ngOnChanges(){
    this.toggleAllChilds(this.checked);
  }

  toggleAllChilds(setTo ?: boolean){
    this.branch._branches._include = [];
    this.branch._branches._exclude = [];
    this.branch._branches._all = (this.checked) ? setTo || !this.branch._branches._all : false;
    this.updateChilds();
  }

  updateChilds(){
    if(this.isArrayValue){
      this.branch._branches._value = (<HierarchyTreeInterface[]>this.branch._branches._value).map((childBranch)=>{
        return this.isBranchChecked(childBranch,this.branch);
      })
    }
  }

  emitUpwards(eventName,ev){
  }

}
