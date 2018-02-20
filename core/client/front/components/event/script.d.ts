export declare class EventFieldComponent {
    data: any;
    userRole: number;
    ready: boolean;
    errors: Array<any>;
    constructor();
    setValue(value: any): void;
    ngOnInit(): void;
    validate(value: any): Promise<{}>;
}
