import { OnInit } from '@angular/core';
export declare class ColorFieldComponent implements OnInit {
    data: any;
    userRole: number;
    cmyk: any;
    errors: Array<any>;
    constructor();
    ngOnInit(): void;
    setValue(event: any): void;
    validate(value: any): Promise<{}>;
}
