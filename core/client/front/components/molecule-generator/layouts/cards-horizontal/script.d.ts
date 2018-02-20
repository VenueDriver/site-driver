import { OnInit } from '@angular/core';
export declare class GeneratorLayoutHorizontalCards implements OnInit {
    data: any;
    instances: any;
    ready: boolean;
    userRole: number;
    savingData: boolean;
    editingList: any;
    show_new_molecule_form: boolean;
    show_generator_edit_form: boolean;
    list: Array<any>;
    selectedMolecules: Array<any>;
    name: string;
    layout: string;
    structure: string;
    use_only_childs: boolean;
    constructor();
    ngOnInit(): void;
}
