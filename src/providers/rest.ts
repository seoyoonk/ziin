import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrl = 'http://192.168.0.17:8080';
  public app_ver = "0.1";
  public app_id = "com.fliconz.ziin";
  loading;

  public userInfo = { mobile: '', mem_nm: '', email: '', mem_img: '', sns: '', sns_id: '', push_token: '' };
  public deviceInfo = { app_ver: this.app_ver, app_id: this.app_id, device_id: '', os_type: '', os_ver: '', auth_token: 'NO_HAS_APP_TOKEN' };
  constructor(public http: Http, private loadingCtrl: LoadingController) {

  }
  login(loginInfo) {

    return this.post('/api/member/login.do', loginInfo).map(res => res.json());
  }
  showLoading(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }
  closeLoading() {
    if (this.loading != null) this.loading.dismiss();
  }
  appStart() {

    let response = this.post("/api/appStart.do", this.userInfo);
    return response.map(
      (res) => {
        alert(JSON.stringify(res.headers)); // Print http header
        if (res.headers.get("x-auth-result") == 'not_found_user') {
          return { result_code: -1 };
        }
        else if (res.headers.get('x-auth-result') == 'auth_success') {
          this.deviceInfo.auth_token = res.headers.get('auth_token');
          return { result_code: 0 };
        }
        else {
          alert(res.headers.get('x-auth-result'));
          return { result_code: -2 }; // auth fail
        }

      }

    )

  }
  private post(url, param1: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append("x-app-agent", JSON.stringify(this.deviceInfo));

    let param: any = new Object();
    param.req_data = param1;
    console.log("ziin: before post " + this.apiUrl + url);
    console.log("headers : ");
    console.log(headers);
    console.log("params : ");
    console.log(param1);
    console.log("...\n...\n");
    let res = this.http.post(this.apiUrl + url, param, { headers: headers });
    console.log("response : ");
    console.log(res);
    console.log("\n\n\n\n");
    return res;
  }

  insertMember() {
    return this.post("/api/member/insertMember.do", this.userInfo).map(
      (res) => {
        this.deviceInfo.auth_token = res.headers.get('auth_token');
        return res.json();
      }
    );
  }

  getDeliveryList(kubun: string) {
    var response = this.http.get("http://192.168.0.17:8090/test/deliveryList.jsp").map(res => res.json());
    return response;
  }
  sendLocation(lat: number, lng: number) {
    var url: string = "http://192.168.0.17:8090/test/sendLocation.jsp?lat=" + lat + "&lng=" + lng;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
  selectListGoodsRcmd() {
    return this.post("/api/goodsRcmd/selectListGoodsRcmd.do", this.userInfo).map(
      (res) => {
        return res.json();
      });
  }
}
