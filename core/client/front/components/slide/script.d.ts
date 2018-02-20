import { OnInit } from '@angular/core';
export declare class SlideFieldComponent implements OnInit {
    data: any;
    userRole: number;
    use_item_type: string;
    overwrite: boolean;
    panel: boolean;
    ready: boolean;
    filter_events: any;
    errors: Array<any>;
    constructor();
    resetTMP(): void;
    setDefaults(): void;
    openPanel(): void;
    closePanel(): void;
    togglePanel(): void;
    isImage(value: any): boolean;
    grabFiles(files: any): void;
    ngOnInit(): void;
    setValue(event: any): void;
    newItemToUse(itemType: any): void;
    updateFilter(venue: any): void;
    setDataItem(item: any, init?: boolean): void;
    validate(value: any): Promise<{}>;
}
