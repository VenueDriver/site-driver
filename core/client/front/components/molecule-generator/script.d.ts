import { OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
export declare class MoleculeGeneratorComponent implements OnInit {
    private dataService;
    data: any;
    instances: Array<any>;
    isDeveloper: boolean;
    ready: boolean;
    animated: boolean;
    animated_modal: boolean;
    selectedLayout: string;
    show_new_molecule_form: boolean;
    constructor(dataService: DataService);
    ngOnInit(): void;
    getComponent(layoutName: any): any;
    toggleModal(): void;
}
