import { HierarchyTreeInterface } from '../interfaces';
export interface HierarchyTreeBranchInterface {
    _all: boolean;
    _include: Array<HierarchyTreeInterface>;
    _exclude: Array<HierarchyTreeInterface>;
    _value: Array<HierarchyTreeInterface> | string | null;
}
