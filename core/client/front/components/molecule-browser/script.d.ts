import { OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../services/data.service';
export declare class MoleculeBrowserComponent implements OnInit {
    private ref;
    private dataService;
    data: any;
    valueChange: EventEmitter<{}>;
    userRole: number;
    additional_classes: any;
    isDeveloper: boolean;
    errors: Array<any>;
    editing: boolean;
    ready: boolean;
    constructor(ref: ChangeDetectorRef, dataService: DataService);
    parseAdditionalClasses(): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    emitValue(hierarchyTree: any): void;
    validate(value: any): Promise<{}>;
    log(x: any): void;
}
