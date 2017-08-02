import { NodeInterface } from './interfaces';

export interface TextInterface extends NodeInterface{
  _value : string;
  _options : {
    _use_textarea : boolean
  }
}
