export declare class Field {
    _name: string;
    _typeComponent: any;
    _type: string;
    _required: boolean;
    _path: Array<number>;
    _editable_value: boolean;
    _editable_field: boolean;
    _delete_field: boolean;
    _visible_field: boolean;
    constructor(name: string, type: any, opts?: any);
}
