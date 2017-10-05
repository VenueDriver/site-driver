import { HierarchyTreeInterface } from '../interfaces';

export interface HierarchyTreeChildInterface{
  _all : boolean,
  _include : Array<HierarchyTree>, // if all = false, will use include to exceptionaly add values
  _exclude : Array<HierarchyTree>  // if all = true, will use exclude to exceptionaly remove values
}
