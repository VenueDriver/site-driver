import { NodeInterface } from '../interfaces';

export interface BooleanInterface extends NodeInterface{
  _value : boolean;
  _default_value : boolean;
  _options : {
    _additional_css_classes : string
  }
}
