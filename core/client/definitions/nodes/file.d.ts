import { Molecule } from './molecule';
import { FileNodeComponent } from '../../front/components/file/script';
import { FileInterface } from './../interfaces';
export declare class FileNode extends Molecule implements FileInterface {
    _ngClass: string;
    _type: string;
    _label: string;
    _ngComponent: typeof FileNodeComponent;
    _value: string;
    _instance_of: string;
    _default_value: string;
    _options: any;
    constructor(obj: FileInterface);
}
