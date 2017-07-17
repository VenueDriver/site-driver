import { SlideFieldComponent }  from '../front/components/slide/script';
import { Field }  from './field';


export class Slide extends Field {
  _value : any;
  _filter : Array<any>;

  constructor(opts : any, value : string = "") {
    super(opts._name,SlideFieldComponent,opts);
    this._filter = opts._filter;
    this._value = opts._value || {
      media : "",
      title : "",
      additional_text : "",
      buttons : [
        {label : "", url : ""},
        {label : "", url : ""}
      ],
      tmp : {
        media : "",
        title : "",
        additional_text : "",
        buttons : [
          {label : "", url : ""},
          {label : "", url : ""}
        ],
        use_item_type : "",
        use_information_from : false
      },
      use_item_type : "",
      use_information_from : false
    };
  }

}
