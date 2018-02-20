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
var MoleculeHierarchyTreeBranchComponent = (function () {
    function MoleculeHierarchyTreeBranchComponent(ref) {
        this.ref = ref;
        this.ready = false;
        this.isArrayValue = false;
        this.selectedBranch = false;
        this._previous_checked = false;
        this.single_value = false;
        this.output_branch_only = false;
        this.branchSelectionList = [];
        this.disable_top_level = false;
        this.hide_instance_values = false;
        this.selected = new core_1.EventEmitter();
        this.treeUpdated = new core_1.EventEmitter();
        this.branchClick = new core_1.EventEmitter();
    }
    MoleculeHierarchyTreeBranchComponent.prototype.branchClicked = function (branch) {
        if (this.output_branch_only) {
            if (!this.disable_top_level || !this.isTopLevel(branch)) {
                this.branchClick.emit(branch || this.branch);
            }
        }
    };
    MoleculeHierarchyTreeBranchComponent.prototype.isTopLevel = function (branch) {
        if (branch === void 0) { branch = this.branch; }
        return branch._path_trace.length === 1;
    };
    MoleculeHierarchyTreeBranchComponent.prototype.branchChanged = function (branch) {
        this.treeUpdated.emit(branch);
    };
    MoleculeHierarchyTreeBranchComponent.prototype.ngOnInit = function () {
        if (this.branch) {
            this.isArrayValue = Array.isArray(this.branch._branches._value);
            // this.toggleAllChilds(this.branch._branches._all);
            this.branchSelected();
            this.ready = true;
        }
    };
    MoleculeHierarchyTreeBranchComponent.prototype.checkBoxClicked = function (current_state) {
        this.branch._checked = !this.branch._checked;
        this.toggleAllChilds(this.branch._checked);
        // this.selected.emit(current_state);
    };
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
    MoleculeHierarchyTreeBranchComponent.prototype.ngOnChanges = function (changes) {
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
        this.branchSelected();
    };
    MoleculeHierarchyTreeBranchComponent.prototype.branchSelected = function () {
        var _this = this;
        if (this.branchSelectionList.find(function (el) { return el._id === _this.branch._id; })) {
            this.branch._selected = true;
        }
        else {
            this.branch._selected = false;
        }
    };
    MoleculeHierarchyTreeBranchComponent.prototype.toggleAllChilds = function (setTo) {
        this.branch._branches._include = [];
        this.branch._branches._exclude = [];
        if (!this.branch._checked) {
            this.branch._branches._all = false;
        }
        else {
            if (setTo) {
                this.branch._branches._all = setTo;
            }
            else {
                this.branch._branches._all = !this.branch._branches._all;
            }
        }
        // this.updateChilds();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "branch", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "parent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "tree", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "single_value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "output_branch_only", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "branchSelectionList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "disable_top_level", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "hide_instance_values", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "treeUpdated", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MoleculeHierarchyTreeBranchComponent.prototype, "branchClick", void 0);
    MoleculeHierarchyTreeBranchComponent = __decorate([
        core_1.Component({
            selector: 'molecule-hierarchy-tree-branch',
            template: require('./template.html'),
            styles: [require('./styles.css')]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], MoleculeHierarchyTreeBranchComponent);
    return MoleculeHierarchyTreeBranchComponent;
}());
exports.MoleculeHierarchyTreeBranchComponent = MoleculeHierarchyTreeBranchComponent;
//# sourceMappingURL=script.js.map