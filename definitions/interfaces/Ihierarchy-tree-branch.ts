import { HierarchyTreeInterface } from '../interfaces';

export interface HierarchyTreeBranchInterface{
  _all : boolean,
  _include : Array<HierarchyTreeInterface>, // if all = false, will use include to exceptionaly add values
  _exclude : Array<HierarchyTreeInterface>,  // if all = true, will use exclude to exceptionaly remove values
  _value : Array<HierarchyTreeInterface> | string | null // The final result of the previous configuration
}
