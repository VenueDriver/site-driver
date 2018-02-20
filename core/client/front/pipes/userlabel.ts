import { Pipe , PipeTransform } from '@angular/core';

@Pipe({name: 'userlabel'})
export class UserLabelPipe implements PipeTransform {
  transform(value: string, user: number = 1) : any {
    if(value){
      let pretty = value.toUpperCase().replace(/\_/gi," ");
      value = (user>9000) ? pretty+" ("+value+")" : pretty;
      return value;
    }else{
      return value;
    }
  }
}
