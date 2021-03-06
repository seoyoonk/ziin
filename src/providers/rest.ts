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
  //public apiUrl = 'http://14.63.197.21:7070';
  public apiUrl = 'http://192.168.0.17:8080';
  public app_ver = "0.1";
  public app_id = "com.fliconz.ziin";
  loading;

  public userInfo = { auth_result: 0, mem_no: '', not_yet_read: 0, mobile: '', mem_nm: '', email: '', mem_img: '', sns: '', sns_id: '', push_token: '' };
  public deviceInfo = { app_ver: this.app_ver, app_id: this.app_id, device_id: '', os_type: '', os_ver: '', auth_token: 'NO_HAS_APP_TOKEN' };
  public config = { img_goods_root_path: 'http://14.63.197.21:7070/resources/goods_image', goods_not_login: "http://192.168.0.17:8100/?" };


  clearAuthToken() {
    this.deviceInfo.auth_token = "NO_HAS_APP_TOKEN";
  }
  constructor(public http: Http, private loadingCtrl: LoadingController) {

  }
  insertGoods(isNew: boolean, goodsInfo) {
    if (isNew) {
      return this.post('/api/goods/insertGoods.do', goodsInfo);
    }
    else {
      return this.post('/api/goods/updateGoods.do', goodsInfo);
    }
  }

  login(loginInfo) {

    return this.post('/api/member/login.do', loginInfo).map(res => {
      this.deviceInfo.device_id = "fc85bf4b81491385";

      let res_data = res.res_data;

      this.userInfo.email = res_data.email;
      this.userInfo.mem_no = res_data.mem_no;
      this.userInfo.mem_img = res_data.mem_img;
      this.userInfo.mem_nm = res_data.mem_nm;
      this.userInfo.not_yet_read = res_data.not_yet_read;
      this.config = res_data.config;
      return res;
    });
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
        let result_code = this.userInfo.auth_result;

        if (result_code == 0) {

          let res_data = res.res_data;
          if (res_data.mem_no != null) {
            this.userInfo.mem_no = res_data.mem_no;
            this.userInfo.mem_img = res_data.mem_img;
            this.userInfo.mem_nm = res_data.mem_nm;
            this.userInfo.not_yet_read = res_data.not_yet_read;
            this.config = res_data.config;
          }
        }
        else if (result_code == -1) {
          this.clearAuthToken();
          alert("다른 곳에서 로그인하셨습니다. 다시 로그인 합니다.");
        }
        return { result_code: result_code };
      }


    )

  }

  private post(url, param1: any) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append("x-app-agent", JSON.stringify(this.deviceInfo));
    console.log("ziin: " + url);
    console.log(param1);
    let param: any = new Object();
    param.req_data = param1;
    return this.http.post(this.apiUrl + url, param, { headers: headers }).map(
      (res) => {
        console.log(res);
        if (res.headers.get("x-auth-result") == 'not_found_user') {
          this.userInfo.auth_result = -2;
        }
        else if (res.headers.get('x-auth-result') == 'auth_success') {
          this.userInfo.auth_result = 0;
          if (res.headers.get('auth_token') != null) {

            this.deviceInfo.auth_token = res.headers.get('auth_token');
          }
        }
        else {
          this.userInfo.auth_result = -1;
        }
        try{
        return res.json();
        }catch(e){
          console.log(e);
          return {res_data : {}};
        }
      }
    );


  }
  private get(url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencode');

    headers.append("x-app-agent", JSON.stringify(this.deviceInfo));


    let res = this.http.get(this.apiUrl + url, { headers: headers });

    return res;
  }

  insertMember() {
    return this.post("/api/member/insertMember.do", this.userInfo);
  }

  selectListGoodsRcmd() {
    return this.post("/api/goodsRcmd/selectListGoodsRcmd.do", { page_no: 1, row_count: 100 });
  }

  selectOneGoodsRcmd(goodsInfo) {
    return this.post("/api/goodsRcmd/selectOneGoodsRcmd.do", goodsInfo);
  }

  listComment(goodsInfo) {
    return this.post("/api/goods/selectListGoodsComment.do", goodsInfo);
  }

  insertComment(data) {
    return this.post("/api/goods/insertGoodsComment.do", data);
  }

  insertRcmd(data) {
    return this.post("/api/goods/insertGoodsRcmds.do", data);
  }

  getAddress(searchStr: string, page_no: number) {
    return this.post("/api/zip.do", { searchText: searchStr, currentPage: page_no, countPerPage: 20 });
  }

  selectOrderDeliveryAddr() {
    return this.post("/api/member/selectOrderDeliveryAddr.do", {});
  }

  requestOrder(data) {
    return this.post("/api/order/requestOrder.do", data);
  }

  getOrderPageList(data) {
    return this.post("/api/order/getOrderPageList.do", data);
  }

  requestCancel(data, type) {
    if(type == "cancel"){
      return this.post("/api/order/requestCancel.do", data);
    }else if(type == "refund"){
      return this.post("/api/order/requestRefund.do", data);
    }else if(type == "return"){
      return this.post("/api/order/requestReturn.do", data);
    }
  }

  insertGoodsEval(data) {
    return this.post("/api/goods/insertGoodsEval.do", data);
  }
  
}
