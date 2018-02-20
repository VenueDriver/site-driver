import { OnInit } from '@angular/core';
export declare class GeneratorLayoutVerticalCards implements OnInit {
    data: any;
    instances: any;
    ready: boolean;
    userRole: number;
    savingData: boolean;
    editingList: any;
    list: Array<any>;
    selectedMolecules: Array<any>;
    name: string;
    layout: string;
    structure: string;
    use_only_childs: boolean;
    constructor();
    ngOnInit(): void;
}
