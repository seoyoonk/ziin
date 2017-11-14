import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-myOrderList',
  templateUrl: 'myOrderList.html'
})
export class MyOrderListPage {
  @ViewChild(Nav) nav: Nav;

  listKubun: string = "ing";
  complateViewYn: boolean = false;
  cancelViewYn: boolean = false;

  ing_page_no: number = 1;
  complate_page_no: number = 1;
  cancel_page_no: number = 1;

  dt_from: string = "";
  dt_to: string = "";

  ingDataList: any = [];
  complateDataList: any = [];
  cancelDataList: any = [];


  constructor(public navCtrl: NavController, public rest: RestProvider) {

  }

  ionViewDidLoad() {
  }

  segmentChanged() {
    if (this.listKubun == "complate" && !this.complateViewYn) {
      this.complateViewYn = true;
    } else if (this.listKubun == "cancel" && !this.cancelViewYn) {
      this.cancelViewYn = true;
    }
  }

  scrollEnd(infiniteScroll) {
    let page_no: number;
    switch (this.listKubun) {
      case "order":
        page_no = ++this.ing_page_no;
        break;
      case "settle":
        page_no = ++this.complate_page_no;
        break;
      case "cancel":
        page_no = ++this.cancel_page_no;
        break;
    }
    let data = {
      page_no: page_no,
      row_count: 20,
      search_term_type: "order_dttm",
      search_term_start: this.dt_from.replace(/-/gi, ""),
      search_term_end: this.dt_to.replace(/-/gi, ""),
      search_order_status_type: this.listKubun
    }
    this.rest.showLoading("");
    this.rest.getOrderPageList(data).subscribe(
      (res) => {
        console.log(res);
        switch (this.listKubun) {
          case "ing":
            this.ingDataList = this.ingDataList.concat(res.res_data.order_list);
            break;
          case "complate":
            this.complateDataList = this.complateDataList.concat(res.res_data.order_list);
            break;
          case "cancel":
            this.cancelDataList = this.cancelDataList.concat(res.res_data.order_list);
            break;
        }
        infiniteScroll.complete();
      });
  }
  search() {
    let data = {
      page_no: 1,
      row_count: 20,
      search_term_type: "order_dttm",
      search_term_start: this.dt_from.replace(/-/gi, ""),
      search_term_end: this.dt_to.replace(/-/gi, ""),
      search_order_status_type: this.listKubun
    }
    this.rest.showLoading("");
    this.rest.getOrderPageList(data).subscribe(
      (res) => {
        console.log(res);
        switch (this.listKubun) {
          case "ing":
            this.ingDataList = res.res_data.order_list;
            this.ing_page_no = 1;
            break;
          case "complate":
            this.complateDataList = res.res_data.order_list;
            this.complate_page_no = 1;
            break;
          case "cancel":
            this.cancelDataList = res.res_data.order_list;
            this.cancel_page_no = 1;
            break;
        }
        this.rest.closeLoading();
      });

  }

  getMinMaxDate(type: string) {
    var date = new Date();
    switch (type) {
      case "toMin":
        date.setDate(date.getDate() + 1);
        break;
      case "toMax":
        date.setFullYear(date.getFullYear() + 10);
        break;
    }
    return date
  }

}
