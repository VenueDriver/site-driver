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
  _selection : Array<HierarchyTreeInterface> = [];
  outputValue : any = {};

  @Input() single_value : boolean = false;
  @Input() output_branch_only : boolean = false;
  @Input() root : HierarchyTreeInterface;
  @Output() treeUpdated = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  constructor(private moleculeService : MoleculeService){

  }


  branchChanged( branch : HierarchyTreeInterface ){
    console.log("received branch",branch);
    if(!this.output_branch_only){
      this.outputValue = this._tree;
    }else{
      this.outputValue = this.getBranchSelection(branch);
    }
    console.log("Emit value:",this.outputValue);
    this.treeUpdated.emit(this.outputValue);
    this.valueChange.emit(this.outputValue);
  }

  getBranchSelection(branch : HierarchyTreeInterface){
    if(this.single_value){
      this._selection = [branch];
    }else{
      const avoidInsest = (branch : HierarchyTreeInterface) : Array<HierarchyTreeInterface> =>{
        let newSelection = this._selection.slice();
        let depth = branch._path_trace.length;

        const getParenthoodReport = (branch : HierarchyTreeInterface ,value : HierarchyTreeInterface )=>{
          let report = { child : false, parent : false};
          let ancestry = depth - value._path_trace.length;

          if (ancestry > 0){
            //Branch could be child, check:
            report.child = true;
            value._path_trace.forEach((index,i)=>{
              if(index !== branch._path_trace[i]) report.child = false;
            });
          }else if(ancestry < 0){
            //Branch could be parent, check:
            report.parent = true;
            branch._path_trace.forEach((index,i)=>{
              if(index !== value._path_trace[i]) report.parent = false;
            });
          }

          return report;
        }

        let insertValueAfterFilter = true;

        newSelection = newSelection.filter((existing_selection)=>{

          //If exists, it'll be removed.
          if(existing_selection._id == branch._id){
            insertValueAfterFilter = false;
            return false;
          }

          let branchIs = getParenthoodReport(branch,existing_selection);

          console.log("See report:",branchIs);

          // If it's a child of an existing value, the parent will be removed.
          if(branchIs.child){
            return false;
          }

          // If it's parent of one or more values It'll replace those.
          if(branchIs.parent){
            return false;
          }

          //If it's from the same depth level or it doesn't exist it'll be added.
          return true;
        });

        if(insertValueAfterFilter){
          newSelection.push(branch);
        }

        return newSelection;
      }
      this._selection = avoidInsest(branch);
    }
    return this._selection;
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
      console.log("Getting data");
      this.rebuildTree();
    }).catch((err)=>{
      console.log(err);
    })
  }


  buildTree(){
    console.log("Root?",this.root);
    if(this.root){
      this._tree = this.root;
    }else{
      this._tree = {
        _type : "root",
        _id : "",
        _name : "root",
        _path_trace : [],
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
    console.log("buildTree() : _tree",this._tree);
  }


  buildTreeBranch(branch : HierarchyTreeInterface) : HierarchyTreeInterface | null{
    if(branch._branches._value.length > 0) return branch
    let childs = [];

    const convertValueIntoBranch = (value,parent,index)=>{
      if(value._branches) return value;

      let _path_trace_to_root = parent._path_trace.slice();
      _path_trace_to_root.push(index);

      let value_branch_values = (Array.isArray(value._value)) ? [] : typeof value._value;

      let currentBranch = {
        _type : value._type,
        _id : value._id,
        _name : value._name,
        _path_trace : _path_trace_to_root,
        _checked : true,
        _branches : {
          _all : true,
          _include : [],
          _exclude : [],
          _value : value_branch_values
        }
      };



      if(value._ngClass !== "MoleculeGenerator" && Array.isArray(value._value)){
        value_branch_values = value._value.map( (el,i) => convertValueIntoBranch(el,currentBranch,i));
      }

      currentBranch._branches._value = value_branch_values;

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

      childs = childs.map( (el,i) => convertValueIntoBranch(el,branch,i) );
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
