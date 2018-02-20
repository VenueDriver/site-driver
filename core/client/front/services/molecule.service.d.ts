import { OnInit } from '@angular/core';
import { ServerService } from './server.service';
export declare class MoleculeService implements OnInit {
    private _server;
    index: any;
    parser: any;
    cache: any;
    constructor(_server: ServerService);
    ngOnInit(): void;
    validateMolecule(molecule: any): Promise<{}>;
    saveMolecule(query: any): Promise<{}>;
    removeMolecule(molecule: any): Promise<{}>;
    getMoleculeList(query: any): Promise<any>;
    getAllMolecules(): Promise<any>;
}
