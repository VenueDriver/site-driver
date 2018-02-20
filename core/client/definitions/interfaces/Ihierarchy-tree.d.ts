import { HierarchyTreeBranchInterface } from '../interfaces';
export interface HierarchyTreeInterface {
    _type: string;
    _id: string;
    _name: string;
    _path_trace: Array<number>;
    _branches: HierarchyTreeBranchInterface;
    _checked: boolean;
    _selected: boolean;
}
