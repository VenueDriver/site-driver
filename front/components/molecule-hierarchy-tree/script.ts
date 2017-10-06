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

  ngOnInit(){
    this.moleculeService.getMoleculeList({
      type : ["instance","generator"]
    }).then((cache)=>{
      this.ready = true;
      console.log("List loaded");
      this._og_list = cache.data;
      console.log(this._og_list);
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
    let childs = [];
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
      childs = childs.map((el)=>{
        return {
          _type : el._type,
          _id : el._id,
          _name : el._name,
          _branches : {
            _all : true,
            _include : [],
            _exclude : [],
            _value : []
          }
        }
      })
      //EXCLUDE THE CORRESPONDING CHILDS
      if(branch._branches._exclude.length > 0){
        let excluded_ids = branch._branches._exclude.map((excluded)=> excluded._id);
        childs.filter((el)=> excluded_ids.indexOf(el._id) < 0 );
      }
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
