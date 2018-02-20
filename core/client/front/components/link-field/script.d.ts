import { OnInit } from '@angular/core';
export declare class LinkFieldComponent implements OnInit {
    data: any;
    userRole: number;
    errors: Array<any>;
    constructor();
    ngOnInit(): void;
    setValue(event: any): void;
    validate(value: any): Promise<{}>;
}
