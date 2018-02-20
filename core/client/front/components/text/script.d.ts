import { OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
export declare class TextNodeComponent implements OnInit {
    private dataService;
    data: any;
    additional_classes: any;
    userRole: number;
    errors: Array<any>;
    ckeditorContent: any;
    isDeveloper: boolean;
    editing: boolean;
    ready: boolean;
    constructor(dataService: DataService);
    parseAdditionalClasses(): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    setValue(event: any): void;
    validate(value: any): Promise<{}>;
}
