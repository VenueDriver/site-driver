import { Component , Input , OnInit } from '@angular/core';
import { Group , Text } from '../../../models/models';
import { DataService } from '../../services/data.service';



@Component({
  selector: 'generator',
  template: require('./template.html'),
  styles : [require('./styles.css')],
  //encapsulation: ViewEncapsulation.None
})

export class GeneratorComponent implements OnInit {

  type  : any;
  name  : string;
  value   : any;
  required : boolean;
  editable_value : boolean;
  editable_field : boolean;
  delete_field   : boolean;
  visible_field  : boolean;
  use_textarea   : boolean;
  columns : number;
  filter  : any;
  useComponents : Array<any>;
  panel   : boolean = false;
  @Input() noName : boolean ;
  @Input() defaultValues : any = false;
  @Input() components : Array<any> ;
  @Input() path : Array<number>;
  @Input() label : string;
  @Input() edit : any = false;
  @Input() noModal : boolean = false;
  disableType = false;
  constructor(private dataService : DataService){
    this.restoreDefault();
  }

  restoreDefault(){
    this.value = "";
    this.type = "";
    this.name = "";
    this.required = false;
    this.editable_value = true;
    this.editable_field = false;
    this.delete_field   = false;
    this.visible_field  = true;
    this.use_textarea = false;
    this.filter = { venues : [] , artists : []};
    this.useComponents = [];
    this.columns = 12;
  }

  setValues(data : any){
    data = Object.assign({},data);
    this.value = (data.hasOwnProperty("_value")) ? data._value : this.value;
    this.type = (data.hasOwnProperty("_type")) ? data._type : this.type;
    this.name = (data.hasOwnProperty("_name")) ? data._name : this.name;
    this.required = (data.hasOwnProperty("_required")) ? data._required : this.required;
    this.editable_value = (data.hasOwnProperty("_editable_value")) ? data._editable_value : this.editable_value;
    this.editable_field = (data.hasOwnProperty("_editable_field")) ? data._editable_field : this.editable_field;
    this.delete_field   = (data.hasOwnProperty("_delete_field")) ? data._delete_field : this.delete_field;
    this.visible_field  = (data.hasOwnProperty("_visible_field")) ? data._visible_field : this.visible_field;
    this.filter = (data.hasOwnProperty("_filter")) ? data._filter : this.filter;
    this.components = (data.hasOwnProperty("_useComponents")) ? data._useComponents : this.useComponents;
    this.useComponents = (data.hasOwnProperty("_useComponents")) ? data._useComponents : this.useComponents;
    this.columns = (data.hasOwnProperty("_columns")) ? data._columns : this.columns;
    this.use_textarea = (data.hasOwnProperty("_use_textarea")) ? data._use_textarea : this.use_textarea;
  }

  showPanel(){
    if(this.noModal && this.components.length === 1){
      if(this.defaultValues){
        this.setValues(this.defaultValues);
      }
      this.type = this.components[0];
      this.save();
    }else{
      if(this.edit){
        this.setValues(this.edit);
      }
      this.panel = true;
    }
  }

  hidePanel(){
    this.panel = false;
    this.restoreDefault();
  }

  onKey(event){
    this.name = event.target.value.replace(/(\s+|\-)/gi,"_").toLowerCase();
  }

  save(){
    if(this.noModal) this.delete_field = true;
    this.validate().then((errors : Array<any>)=>{
      if(errors.length < 1){
        let newData : any = {
          _name : this.name,
          _typeComponent : this.type ,
          _required : this.required ,
          _editable_value : this.editable_value,
          _editable_field : this.editable_field,
          _delete_field   : this.delete_field,
          _visible_field  : this.visible_field
        };
        if(this.value) newData._value = this.value;
        if(this.type == "Group") newData._columns = this.columns;
        if(this.type == "Text") newData._use_textarea = this.use_textarea;
        if(['Event','Slider','Slide'].indexOf(this.type) > -1) newData._filter = this.filter;
        if(this.type == "List") newData._useComponents = this.useComponents;



        if(this.edit){
          newData._child = this.edit._child;
          this.dataService.update(this.path,newData);
          this.hidePanel();
        }else{
          this.dataService.post(this.path,newData);
          this.hidePanel();
        }

      }else{
        alert(errors.join('\n'));
      }
    })
  }

  setVenueFilter(list){
    this.filter.venues = list.map(el=>el.id);
  }

  setArtistFilter(list){
    this.filter.artists = list.map(el=>el.id);
  }

  setTypeList(list){
    this.useComponents = list;
  }

  validate(){
    return new Promise((resolve,reject)=>{
      let errors : Array<any> = [];
      let path = this.path.map((el)=>el);
      if(this.edit){
        path.pop();
      }
      let siblings = this.dataService.findParent(path)._child;
      let existsName = false;
      siblings.forEach(el=>{
        if(el._name === this.name){
          if(this.edit){
            if(el._name !== this.edit._name){
              existsName = true;
            }
          }else{
            existsName = true;
          }
        }
      })
      if(this.noName !== true){
        if(existsName){
          errors.push(`'${this.name}' already exists on this group.`)
        }
        if(this.name.search(/^[a-zA-Z0-9_]+$/)== -1){
          errors.push(`'${this.name}' contains invalid characters. Only alphanumeric and underscores allowed.`)
        }
        if((/^\_/).test(this.name)){
          errors.push(`First charcter of name can not be underscore '_'.`)
        }
      }
      resolve(errors)
    })
  }

  ngOnInit(){
    if(this.edit){
      this.restoreDefault();
      this.disableType = true;
      this.setValues(this.edit);
    }
  }

  testlog(log){ console.log(log) }

}
