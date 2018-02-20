import { OnInit, EventEmitter } from '@angular/core';
export declare class FileFieldComponent implements OnInit {
    data: any;
    userRole: number;
    valueChange: EventEmitter<{}>;
    panel: boolean;
    errors: Array<any>;
    constructor();
    ngOnInit(): void;
    openPanel(): void;
    closePanel(): void;
    togglePanel(): void;
    isImage(): boolean;
    grabFiles(files: any): void;
    validate(value: any): Promise<{}>;
}
