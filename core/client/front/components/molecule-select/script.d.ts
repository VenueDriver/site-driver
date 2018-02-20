import { OnInit, EventEmitter } from '@angular/core';
import { MoleculeService } from '../../services/molecule.service';
export declare class MoleculeSelect implements OnInit {
    private moleculeService;
    typesList: any;
    ready: boolean;
    activeTypes: any;
    max: number;
    valueChange: EventEmitter<{}>;
    useMolecules: Array<any>;
    useMoleculesParsed: Array<string>;
    constructor(moleculeService: MoleculeService);
    emitValue(item: any): void;
    formatItems(item: any): string;
    update(): Promise<void>;
    ngOnInit(): void;
    ngOnChanges(): void;
}
