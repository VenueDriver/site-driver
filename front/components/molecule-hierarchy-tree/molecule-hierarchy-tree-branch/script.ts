import { Component , Input , OnInit , Output, EventEmitter, ComponentRef, ChangeDetectorRef} from '@angular/core';
import { HierarchyTreeInterface } from '../../../../definitions/interfaces'

@Component({
  selector: 'molecule-hierarchy-tree-branch',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeHierarchyTreeBranchComponent implements OnInit {

  ready : boolean = false;
  isArrayValue : boolean = false;
  selectedBranch : boolean = false;
  _previous_checked : boolean = false;

  @Input() branch : HierarchyTreeInterface;
  @Input() parent : HierarchyTreeInterface;
  @Input() tree : HierarchyTreeInterface;

  @Input() single_value : boolean = false;
  @Input() output_branch_only : boolean = false;
  @Input() branchSelectionList : Array<HierarchyTreeInterface> = [];

  @Output() selected = new EventEmitter();
  @Output() treeUpdated = new EventEmitter();
  @Output() branchClick = new EventEmitter();

  constructor(private ref: ChangeDetectorRef){

  }

  branchClicked(branch ?: HierarchyTreeInterface){
    if(this.output_branch_only){
      this.branchClick.emit(branch || this.branch);
      // this.branch._selected = !this.branch._selected;
      // if(this.parent._selected && this.parent._selected) this.parent._selected = false;
      // if(this.branch._selected && Array.isArray(this.branch._branches._value)){
      //   this.branch._branches._value = this.branch._branches._value.map(el =>{
      //     el._selected = false;
      //     return el;
      //   })
      // }
      // console.log("Branch selected");
    }

  }

  branchChanged(branch : HierarchyTreeInterface){
    this.treeUpdated.emit(branch);
  }

  ngOnInit(){
    if(this.branch){
      this.isArrayValue = Array.isArray(this.branch._branches._value);
      this.toggleAllChilds(this.branch._branches._all);
      this.ready = true;
    }
  }

  checkBoxClicked(current_state){
    this.branch._checked = !this.branch._checked;
    this.toggleAllChilds(this.branch._checked);
    // this.selected.emit(current_state);
  }

  // childChecked(branch){
  //   if(this.checked){
  //     let targetArray = this.branch._branches[ (this.branch._branches._all) ? "_exclude" : "_include"];
  //     let targetIndex = null;
  //     targetArray.forEach((el,i)=>{
  //       if(el._id === branch._id){
  //       targetIndex = i
  //       }
  //     });
  //     if(targetIndex != null){
  //       targetArray.splice(targetIndex,1);
  //     }else{
  //       targetArray.push(branch);
  //     }
  //     this.updateChilds();
  //   }
  // }

  // isBranchChecked(child,parent){
  //   let includedALL = this.branch._branches._all;
  //   let excludedBranch = this.branch._branches._exclude.find(el=> el._id === child._id);
  //   let includedBranch = this.branch._branches._include.find(el=> el._id === child._id);
  //   if(includedALL && excludedBranch){
  //     child._checked = false;
  //   }else if(!includedALL && !includedBranch){
  //     child._checked = false;
  //   }else{
  //     child._checked = true;
  //   }
  //   return child;
  // }

  ngOnChanges(changes){
    // if(this._previous_checked != this.checked){
      // this._previous_checked = this.checked;
      // this.toggleAllChilds();
      // this.branchChanged(this.branch);
    // }
    // console.log("Branch changed:",changes);
    // if(this._parent_selected && this._selected){
    //   this.branch._selected = false;
    //   this._selected = false;
    //   this.ref.detectChanges();
    // }

    if(this.branchSelectionList.find((el)=> el._id === this.branch._id )){
      this.branch._selected = true;
    }else{
      this.branch._selected = false;
    }
  }

  toggleAllChilds(setTo ?: boolean){
    this.branch._branches._include = [];
    this.branch._branches._exclude = [];
    if(!this.branch._checked){
      this.branch._branches._all = false;
    }else{
      if(setTo){
        this.branch._branches._all = setTo;
      }else{
        this.branch._branches._all = !this.branch._branches._all;
      }
    }

    // this.updateChilds();
  }

  // updateChilds(){
  //   if(this.isArrayValue){
  //     this.branch._branches._value = (<HierarchyTreeInterface[]>this.branch._branches._value).map((childBranch)=>{
  //       return this.isBranchChecked(childBranch,this.branch);
  //     })
  //   }
  // }

}
