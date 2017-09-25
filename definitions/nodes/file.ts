import { Molecule } from './molecule'; // IMPORT NODE CLASS
import { FileNodeComponent } from '../../front/components/file/script'; // IMPORT NG COMPONENT
import { FileInterface } from './../interfaces'; // IMPORT INTERFACE


export class FileNode extends Molecule implements FileInterface{

  // THIS CLASS NAME
  _ngClass : string = "FileNode";
  _type : string = "file";
  _label : string = "File";
  _ngComponent = FileNodeComponent;

  // OVERRIDES SPECIFIC TO THIS CLASS
  _value : string = '';
  _instance_of : string = '';
  _default_value : string;
  _options : any = {
    _allow_videos : false,
    _allow_images : true,
    _allow_documents : false,
    _additional_css_classes : ''
  };


  constructor(obj : FileInterface) {

    super(obj);

    for(let key in obj){
      this[key] = obj[key];
    }

  }

}
