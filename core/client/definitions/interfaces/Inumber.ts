import { NodeInterface } from '../interfaces';

export interface NumberInterface extends NodeInterface{
  _value : number;
  _default_value : number;
  _options : {
    _additional_css_classes : string
  }
}
