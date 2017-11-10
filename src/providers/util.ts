import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {
  public images = [];

  constructor() {

  }
  normalizePhone(phoneNumber)
  {
    if(phoneNumber.indexOf("-")<0)
    {
      return phoneNumber.substring(0, 3) + "-" + phoneNumber.substring(3, phoneNumber.length - 4) + "-" + phoneNumber.substring(phoneNumber.length - 4, phoneNumber.length);
    }
    else
    {
      return phoneNumber;
    }
  }
  formatNumber(num)
  {
    
    num += '';
    num = num.replace(/[^\d\.]/g ,'');
    let x = num.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  objectClone(obj, target) {
    if (obj === null || typeof(obj) !== 'object'){
      return obj;
    }
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        target[attr] = obj[attr];
      }
    }
  }

  mobileCheck(phoneNumber){
    phoneNumber = this.normalizePhone(phoneNumber.replace(/-/gi, "").trim());
    return !/^\d{3}-\d{3,4}-\d{4}$/.test(phoneNumber);
  }
  
}