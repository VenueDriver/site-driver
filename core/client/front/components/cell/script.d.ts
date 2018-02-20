import { OnInit } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
import { DataService } from '../../services/data.service';
export declare class CellComponent implements OnInit {
    private moleculeService;
    private dataService;
    data: any;
    additional_classes: any;
    isDeveloper: boolean;
    newMolecule: any;
    reduced: boolean;
    editing: boolean;
    ready: boolean;
    constructor(moleculeService: MoleculeService, dataService: DataService);
    moleculeSelected(selected: any): void;
    ngOnChanges(): void;
    parseAdditionalClasses(): void;
    ngOnInit(): void;
    resetMolecule(event: any): void;
}
