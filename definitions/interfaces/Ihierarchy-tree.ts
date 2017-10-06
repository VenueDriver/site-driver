import { HierarchyTreeBranchInterface } from '../interfaces';

export interface HierarchyTreeInterface{
  _type : string,
  _id : string,
  _name : string,
  _branches : HierarchyTreeBranchInterface
}
