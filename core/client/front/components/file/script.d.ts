import { OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
export declare class FileNodeComponent implements OnInit {
    private dataService;
    data: any;
    userRole: number;
    valueChange: EventEmitter<{}>;
    additional_classes: any;
    panel: boolean;
    editing: boolean;
    ready: boolean;
    isDeveloper: boolean;
    errors: Array<any>;
    constructor(dataService: DataService);
    ngOnInit(): void;
    ngOnChanges(): void;
    parseAdditionalClasses(): void;
    openPanel(): void;
    closePanel(): void;
    togglePanel(): void;
    isImage(): boolean;
    grabFiles(files: any): void;
    validate(value: any): Promise<{}>;
}
