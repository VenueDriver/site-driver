import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';

const data : any = require('../../site_config/data.json');
const extend_data : any = require('../../site_config/extend_data.json');
const layout : any = require('../../site_config/layout.json');
const site : any = require('../../site_config/site.json');
const global : any = require('../../site_config/global.json');

@Injectable()

export class Config{

  private data : any = data;
  private layout : any = layout;
  private site : any = site;
  private global : any = global;

  constructor() {
    this.data.extend_data = extend_data;
  }

  load() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }


  get() {
    return {data : this.data , site : this.site , layout : this.layout , global : this.global};
  }

}
