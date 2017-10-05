import { HierarchyTreeChildInterface } from '../interfaces';

export interface HierarchyTreeInterface{
  _index : number | null | undefined, // Element index in the parent value array or null/undefined if it's root
  _type : string,
  _id : string,
  _name : string,
  _childs : HierarchyTreeChild
}
