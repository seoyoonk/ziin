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

  public userInfo = { mem_no:'', not_yet_read:0, mobile: '', mem_nm: '', email: '', mem_img: '', sns: '', sns_id: '', push_token: '' };
  public deviceInfo = { app_ver: this.app_ver, app_id: this.app_id, device_id: '', os_type: '', os_ver: '', auth_token: 'NO_HAS_APP_TOKEN' };
  public config = {img_goods_root_path:'http://14.63.197.21:7070/resources/goods_image'};
  constructor(public http: Http, private loadingCtrl: LoadingController) {

  }
  login(loginInfo) {

    return this.post('/api/member/login.do', loginInfo).map(res =>
      {
        this.deviceInfo.device_id="fc85bf4b81491385";
        
        let res_data = res.json().res_data;
        this.deviceInfo.auth_token = res_data.auth_token;
        this.userInfo.email = res_data.email;
        this.userInfo.mem_no= res_data.mem_no;
        this.userInfo.not_yet_read= res_data.not_yet_read;
        this.config.img_goods_root_path = res_data.img_goods_root_path;
        return res.json();
      } );
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
          if(res.headers.get('auth_token') != null)
          {
            let res_data = res.json().res_data;
            this.deviceInfo.auth_token = res.headers.get('auth_token');
            this.userInfo.mem_no= res_data.mem_no;
            this.userInfo.not_yet_read= res_data.not_yet_read;
            this.config.img_goods_root_path = res_data.img_goods_root_path;
          } 
          return { result_code: 0 };
        }
        else {
          alert(res.headers.get('x-auth-result'));
          return { result_code: -2 }; // auth fail
        }

      }

    )

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
  private post(url, param1:any)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append("x-app-agent", JSON.stringify(this.deviceInfo));
    console.log("ziin: " + url);
    let param: any = new Object();
    param.req_data = param1;
    let res = this.http.post(this.apiUrl + url, param, { headers: headers });
    
    return res;
  }
  private get(url)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencode');

    headers.append("x-app-agent", JSON.stringify(this.deviceInfo));

    
    let res = this.http.get(this.apiUrl + url,  { headers: headers });
    
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
    return this.post("/api/goodsRcmd/selectListGoodsRcmd.do",{page_no:1, row_count:100}).map(
      (res) => {
        return res.json();
      });
  }
}
