import { Component , Input , OnInit , Output, EventEmitter} from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
import { HierarchyTreeInterface } from '../../../definitions/interfaces'

@Component({
  selector: 'molecule-hierarchy-tree',
  template: require('./template.html'),
  styles : [require('./styles.css')]
})

export class MoleculeHierarchyTreeComponent implements OnInit {

  ready : boolean = false;
  _og_list : Array<any> = [];
  isArrayValue : boolean = true;
  _tree : HierarchyTreeInterface | null = null;
  checked : boolean = true;
  @Input() root : HierarchyTreeInterface;

  @Output() treeUpdated = new EventEmitter();

  constructor(private moleculeService : MoleculeService){

  }

  branchChanged( branch : HierarchyTreeInterface ){
    console.log("Branch changed",branch);
    this.treeUpdated.emit(branch);
  }

  childChecked(branch){
    if(this.checked){
      let targetArray = this._tree._branches[ (this._tree._branches._all) ? "_exclude" : "_include"];
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
    this.branchChanged(this._tree);
  }

  updateChilds(){
    if(this.isArrayValue){
      this._tree._branches._value = (<HierarchyTreeInterface[]>this._tree._branches._value).map((childBranch)=>{
        return this.isBranchChecked(childBranch,this._tree);
      })
    }
  }

  isBranchChecked(child,parent){
    let includedALL = this._tree._branches._all;
    let excludedBranch = this._tree._branches._exclude.find(el=> el._id === child._id);
    let includedBranch = this._tree._branches._include.find(el=> el._id === child._id);
    if(includedALL && excludedBranch){
      child._checked = false;
    }else if(!includedALL && !includedBranch){
      child._checked = false;
    }else{
      child._checked = true;
    }
    return child;
  }

  ngOnInit(){
    this.moleculeService.getMoleculeList({
      type : ["instance","generator"]
    }).then((cache)=>{
      this.ready = true;
      this._og_list = cache.data;
      this.rebuildTree();
    }).catch((err)=>{
      console.log(err);
    })
  }

  buildTree(){
    if(this.root){
      this._tree = this.root;
    }else{
      this._tree = {
        _type : "root",
        _id : "",
        _name : "root",
        _collapsed : false,
        _checked : true,
        _branches : {
          _all : true,
          _include : [],
          _exclude : [],
          _value : []
        }
      }
    }
    this._tree = this.buildTreeBranch(this._tree);
    console.log("_tree:",this._tree);
  }

  buildTreeBranch(branch : HierarchyTreeInterface) : HierarchyTreeInterface | null{
    if(branch._branches._value.length > 0) return branch
    let childs = [];

    const convertValueIntoBranch = (value,parent)=>{
      if(value._branches) return value;
      let value_branch_values = (Array.isArray(value._value)) ? [] : typeof value._value;

      if(value._ngClass !== "MoleculeGenerator" && Array.isArray(value._value)){
        value_branch_values = value._value.map(el => convertValueIntoBranch(el,value));
      }

      let currentBranch = {
        _type : value._type,
        _id : value._id,
        _name : value._name,
        _collapsed : true,
        _checked : true,
        _branches : {
          _all : true,
          _include : [],
          _exclude : [],
          _value : value_branch_values
        }
      };

      return currentBranch;

    }





    if(branch._branches._all === false){
      //USE ONLY THE CORRESPONDING CHILDS
      childs = branch._branches._include;
    }else{
      //FETCH ALL CHILDS FOR THIS BRANCH
      childs = this._og_list.filter((el)=>{
        if(branch._id){
          if(el._generator){
            return el._generator._id == branch._id;
          }
        }else{
          return el._type == "generator";
        }
        return false;
      });

      //EXCLUDE THE CORRESPONDING CHILDS
      if(branch._branches._exclude.length > 0){
        let excluded_ids = branch._branches._exclude.map((excluded)=> excluded._id);
        childs.filter((el)=> excluded_ids.indexOf(el._id) < 0 );
      }

      childs = childs.map( el => convertValueIntoBranch(el,branch) );
    }



    branch._branches._value = childs.map((branch)=>{
      return this.buildTreeBranch(branch);
    });



    return branch;
  }

  rebuildTree(){
    this._tree = null;
    this.buildTree();
  }

}
