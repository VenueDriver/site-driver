import { TextInterface } from 'interfaces';

export class TextNode implements TextInterface {

  constructor(obj : TextInterface) {
    this._ngComponentName = 'TextComponent';
    for(let key in obj){
      this[key] = obj[key];
    }
  }

}
