import { OnInit } from '@angular/core';
import { IMyDateModel } from 'mydatepicker';
export declare class DateFieldComponent implements OnInit {
    data: any;
    userRole: number;
    calendar: boolean;
    errors: Array<any>;
    private myDatePickerOptions;
    ngOnInit(): void;
    constructor();
    setValue(event: IMyDateModel): void;
    getDate(): Date;
    validate(value: any): Promise<{}>;
}
