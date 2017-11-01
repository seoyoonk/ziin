import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrl = 'http://192.168.0.17:8100';
  id;
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }
  appStart(phone:string)
  {
    alert(phone);
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("x-phone", phone);
    
    
    return this.http.get("http://192.168.0.17:8090/test/appStart.jsp", {headers : headers } ).map(
        res => res.json()
    )
    
  }
  getDeliveryList(kubun : string) {
    var response = this.http.get("http://192.168.0.17:8090/test/deliveryList.jsp").map(res => res.json());
    return response;
  }
  sendLocation(lat : number, lng :number)
  {
    var url : string = "http://192.168.0.17:8090/test/sendLocation.jsp?lat=" + lat + "&lng=" + lng;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
}
