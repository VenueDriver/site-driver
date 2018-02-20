"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var molecule_service_1 = require('../../services/molecule.service');
var MoleculeHierarchyTreeComponent = (function () {
    function MoleculeHierarchyTreeComponent(moleculeService) {
        this.moleculeService = moleculeService;
        this.ready = false;
        this._og_list = [];
        this.isArrayValue = true;
        this._tree = null;
        this._selection = [];
        this.outputValue = {};
        this.single_value = false;
        this.output_branch_only = false;
        this.disable_top_level = false;
        this.hide_instance_values = false;
        this.selection = null;
        this.treeUpdated = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
    }
    MoleculeHierarchyTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.moleculeService.getMoleculeList({
            type: ["instance", "generator"]
        }).then(function (cache) {
            // console.log("Received Cache","Root?",this.root);
            _this._og_list = cache.data;
            if (_this.root) {
                console.log("\n\nUsing Provided Root Tree");
                _this._tree = _this.root;
                _this.regenerateTree();
            }
            else {
                console.log("\n\nBuilding Tree");
                _this._tree = _this.buildNewTree();
            }
            // this.updateChilds();
            // console.log("\n\n\n\nTree result",this._tree);
            if (_this.output_branch_only) {
                if (_this.selection) {
                    _this.getBranchSelection(_this.selection);
                }
            }
            else {
                _this.branchChanged(_this._tree);
            }
            _this.ready = true;
        }).catch(function (err) {
            console.error(err);
        });
    };
    MoleculeHierarchyTreeComponent.prototype.valueToBranch = function (value, parent, index) {
        var _path_trace_to_root = parent._path_trace.slice();
        _path_trace_to_root.push(index);
        return {
            _type: value._type,
            _id: value._id,
            _name: value._name,
            _path_trace: _path_trace_to_root,
            _selected: false,
            _checked: true,
            _branches: {
                _all: true,
                _include: [],
                _exclude: [],
                _value: (Array.isArray(value._value)) ? [] : typeof value._value
            }
        };
    };
    MoleculeHierarchyTreeComponent.prototype.buildNewTree = function (branch) {
        var _this = this;
        if (branch === void 0) { branch = false; }
        var valueToBranch = this.valueToBranch;
        var convertValuesIntoBranches = function (value, parent, index) {
            var currentBranch = valueToBranch(value, parent, index);
            var value_branch_values = value._value;
            if (value._ngClass !== "MoleculeGenerator" && Array.isArray(value._value)) {
                value_branch_values = value._value.map(function (el, i) { return convertValuesIntoBranches(el, currentBranch, i); });
            }
            currentBranch._branches._value = value_branch_values;
            return currentBranch;
        };
        if (!branch) {
            branch = {
                _type: "root",
                _id: "",
                _name: "root",
                _path_trace: [],
                _selected: false,
                _checked: true,
                _branches: {
                    _all: true,
                    _include: [],
                    _exclude: [],
                    _value: []
                }
            };
        }
        if (Array.isArray(branch._branches._value)) {
            //FETCH ALL CHILDS FOR THIS BRANCH
            var childs = this.getBranchChilds(branch);
            childs = childs.map(function (el, i) { return convertValuesIntoBranches(el, branch, i); });
            branch._branches._value = childs.map(function (branch) {
                return _this.buildNewTree(branch);
            });
        }
        return branch;
    };
    MoleculeHierarchyTreeComponent.prototype.getBranchChilds = function (branch) {
        var _this = this;
        // console.log("Fetching childs for",branch);
        var childs = this._og_list.filter(function (el) {
            if (branch._id) {
                if (el._generator) {
                    return el._generator._id == branch._id;
                }
            }
            else {
                // IF IT'S ROOT RETURN THE PRIMAL GENERATORS
                return el._type == "generator";
            }
            return false;
        });
        if (childs.length < 1) {
            var deepLoop = false;
            var branchValue = this._og_list.find(function (el) { return el._id == branch._id; });
            if (branchValue) {
                deepLoop = Array.isArray(branchValue._value) && branchValue._ngClass !== "MoleculeGenerator";
            }
            // console.log("Doesn't have childs ;(",branch,"\ndeepLoop = ",deepLoop,"\nbranchValue = ",branchValue);
            if (branchValue && deepLoop) {
                childs = branchValue._value;
                branchValue._value.forEach(function (val) { return _this._og_list.push(val); });
            }
        }
        // console.log("Child result = ",childs);
        return childs;
    };
    MoleculeHierarchyTreeComponent.prototype.regenerateTree = function (branch) {
        var _this = this;
        if (branch === void 0) { branch = false; }
        if (!branch) {
            this._tree = this.regenerateTree(this._tree);
            return this._tree;
        }
        // IF ELEMENT IS THE END OF A BRANCH
        if (!Array.isArray(branch._branches._value)) {
            return branch;
        }
        // GET AN UPDATED LIST OF CHILDS FOR THIS BRANCH
        var newListOfChilds = this.getBranchChilds(branch);
        var branchOldChilds = branch._branches._value.slice();
        // CONVERT THOSE CHILD VALUES INTO BRANCHES
        branch._branches._value = newListOfChilds.map(function (val, index) {
            var newBranch = _this.valueToBranch(val, branch, index);
            var existingValue = branchOldChilds.find(function (el) { return el._id === newBranch._id; });
            // INHERIT ANY IMPORTANT PROPERTY FROM THE OLD BRANCH
            if (existingValue) {
                newBranch._checked = existingValue._checked;
                newBranch._selected = existingValue._selected;
                newBranch._branches._value = existingValue._branches._value;
                newBranch._branches._all = existingValue._branches._all;
                newBranch._branches._include = existingValue._branches._include;
                newBranch._branches._exclude = existingValue._branches._exclude;
            }
            else {
                newBranch._checked = branch._branches._all;
            }
            if (!newBranch._checked)
                newBranch._branches._all = false;
            // DO THE SAME FOR THE CHILD VALUES
            return _this.regenerateTree(newBranch);
        });
        // MAKE SURE CHILDS ARE COHERENT WITH PARENT
        if (branch._checked == false) {
            branch._branches._all = false;
        }
        return branch;
    };
    // childChecked(branch){
    //   if(this.checked){
    //     let targetArray = this._tree._branches[ (this._tree._branches._all) ? "_exclude" : "_include"];
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
    //   this.branchChanged(this._tree);
    // }
    // updateChilds(){
    //   if(this.isArrayValue){
    //     this._tree._branches._value = (<HierarchyTreeInterface[]>this._tree._branches._value).map((childBranch)=>{
    //       return this.isBranchChecked(childBranch,this._tree);
    //     })
    //   }
    // }
    // isBranchChecked(child,parent){
    //   let includedALL = this._tree._branches._all;
    //   let excludedBranch = this._tree._branches._exclude.find(el=> el._id === child._id);
    //   let includedBranch = this._tree._branches._include.find(el=> el._id === child._id);
    //   if(includedALL && excludedBranch){
    //     child._checked = false;
    //   }else if(!includedALL && !includedBranch){
    //     child._checked = false;
    //   }else{
    //     child._checked = true;
    //   }
    //   return child;
    // }
    MoleculeHierarchyTreeComponent.prototype.branchChanged = function (branch) {
        // console.log("received branch",branch);
        if (!this.output_branch_only) {
            this.outputValue = this._tree;
        }
        else {
            this.outputValue = this.getBranchSelection(branch);
        }
        // console.log("Emit value:",this.outputValue);
        this.treeUpdated.emit(this.outputValue);
        this.valueChange.emit(this.outputValue);
    };
    MoleculeHierarchyTreeComponent.prototype.getBranchSelection = function (branch) {
        var _this = this;
        if (Array.isArray(branch)) {
            this._selection = branch;
        }
        else if (this.single_value) {
            this._selection = [branch];
        }
        else {
            var avoidInsest = function (branch) {
                var newSelection = _this._selection.slice();
                var depth = branch._path_trace.length;
                var getParenthoodReport = function (branch, value) {
                    var report = { child: false, parent: false };
                    var ancestry = depth - value._path_trace.length;
                    if (ancestry > 0) {
                        //Branch could be child, check:
                        report.child = true;
                        value._path_trace.forEach(function (index, i) {
                            if (index !== branch._path_trace[i])
                                report.child = false;
                        });
                    }
                    else if (ancestry < 0) {
                        //Branch could be parent, check:
                        report.parent = true;
                        branch._path_trace.forEach(function (index, i) {
                            if (index !== value._path_trace[i])
                                report.parent = false;
                        });
                    }
                    return report;
                };
                var insertValueAfterFilter = true;
                newSelection = newSelection.filter(function (existing_selection) {
                    //If exists, it'll be removed.
                    if (existing_selection._id == branch._id) {
                        insertValueAfterFilter = false;
                        return false;
                    }
                    var branchIs = getParenthoodReport(branch, existing_selection);
                    // If it's a child of an existing value, the parent will be removed.
                    if (branchIs.child) {
                        return false;
                    }
                    // If it's parent of one or more values It'll replace those.
                    if (branchIs.parent) {
                        return false;
                    }
                    //If it's from the same depth level or it doesn't exist it'll be added.
                    return true;
                });
                if (insertValueAfterFilter) {
                    newSelection.push(branch);
                }
                return newSelection;
            };
            this._selection = avoidInsest(branch);
        }
        return this._selection;
    };
    MoleculeHierarchyTreeComponent.prototype.log = function (x) {
        console.log(x);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeComponent.prototype, "single_value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeComponent.prototype, "output_branch_only", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeComponent.prototype, "disable_top_level", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeComponent.prototype, "hide_instance_values", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeComponent.prototype, "root", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeComponent.prototype, "selection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeComponent.prototype, "treeUpdated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeComponent.prototype, "valueChange", void 0);
    MoleculeHierarchyTreeComponent = __decorate([
        core_1.Component({
            selector: 'molecule-hierarchy-tree',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [molecule_service_1.MoleculeService])
    ], MoleculeHierarchyTreeComponent);
    return MoleculeHierarchyTreeComponent;
}());
exports.MoleculeHierarchyTreeComponent = MoleculeHierarchyTreeComponent;
//# sourceMappingURL=script.js.map