import { OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
export declare class NumberNodeComponent implements OnInit {
    private dataService;
    data: any;
    userRole: number;
    additional_classes: any;
    isDeveloper: boolean;
    errors: Array<any>;
    editing: boolean;
    ready: boolean;
    constructor(dataService: DataService);
    parseAdditionalClasses(): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    setValue(event: any): void;
    validate(value: any): Promise<{}>;
}
