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
  _tree : HierarchyTreeInterface | null = null;
  @Input() root : HierarchyTreeInterface;

  constructor(private moleculeService : MoleculeService){

  }

  branchSelected(branch){
    console.log("Branch selected:",branch);
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
    const convertValueIntoBranch = (value)=>{
      if(value._branches) return value;
      let value_branch_values = (Array.isArray(value._value)) ? [] : typeof value._value;

      if(value._ngClass !== "MoleculeGenerator" && Array.isArray(value._value)){
        value_branch_values = value._value.map(convertValueIntoBranch);
      }

      return {
        _type : value._type,
        _id : value._id,
        _name : value._name,
        _branches : {
          _all : true,
          _include : [],
          _exclude : [],
          _value : value_branch_values
        }
      }

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

      childs = childs.map( convertValueIntoBranch );
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
