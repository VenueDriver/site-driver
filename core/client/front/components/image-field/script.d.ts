import { OnInit } from '@angular/core';
export declare class ImageFieldComponent implements OnInit {
    data: any;
    userRole: number;
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
