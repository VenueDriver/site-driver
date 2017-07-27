import { VenueFieldComponent }  from '../front/components/venue/script';
import { Field }  from './field';

export class Venue extends Field {
  _value : any;

  constructor(opts : any ){
    super(opts._name,VenueFieldComponent,opts);
  }
}
