import { ArtistFieldComponent }  from '../front/components/artist/script';
import { Field }  from './field';

export class Artist extends Field {
  _value : any;

  constructor(opts : any ){
    super(opts._name,ArtistFieldComponent,opts);
    this._value = opts._value || null;
  }
}
