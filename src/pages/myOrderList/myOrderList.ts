import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController, PopoverController } from 'ionic-angular';
import { OrderCancelPage } from '../popover/orderCancel';
import { OrderConfirmPage } from '../popover/orderConfirm';
import { RestProvider } from '../../providers/rest';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-myOrderList',
  templateUrl: 'myOrderList.html'
})
export class MyOrderListPage {
  @ViewChild(Nav) nav: Nav;

  listKubun: string = "ing";

  ing_page_no: number = 1;
  complete_page_no: number = 1;
  cancel_page_no: number = 1;

  dt_from: string = "";
  dt_to: string = "";

  ingDataList: any = [];
  completeDataList: any = [];
  cancelDataList: any = [];

  constructor(public navCtrl: NavController, public rest: RestProvider, public popoverCtrl: PopoverController, private modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
  }

  scrollEnd(infiniteScroll) {
    let page_no: number;
    switch (this.listKubun) {
      case "ing":
        page_no = ++this.ing_page_no;
        break;
      case "complete":
        page_no = ++this.complete_page_no;
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
        if(!res.res_data.order_list){
          this.rest.closeLoading();
          infiniteScroll.complete();
          return;
        }
        switch (this.listKubun) {
          case "ing":
            this.ingDataList = this.ingDataList.concat(res.res_data.order_list);
            break;
          case "complete":
            this.completeDataList = this.completeDataList.concat(res.res_data.order_list);
            break;
          case "cancel":
            this.cancelDataList = this.cancelDataList.concat(res.res_data.order_list);
            break;
        }
        this.rest.closeLoading();
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
        if(!res.res_data.order_list){
          this.rest.closeLoading();
          return;
        }
        switch (this.listKubun) {
          case "ing":
            this.ingDataList = res.res_data.order_list;
            this.ing_page_no = 1;
            break;
          case "complete":
            this.completeDataList = res.res_data.order_list;
            this.complete_page_no = 1;
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

  cancel(map) {
    let popover = this.popoverCtrl.create(OrderCancelPage);
    popover.onDidDismiss((param) => {
      if (!param || !param.hasOwnProperty("cancel_tp_cd") || !param.hasOwnProperty("cancel_content")) {
        return;
      }

      let type: any;
      let data = {
        order_no: map.order_no,
        order_goods_no: map.order_goods_no,
        cancel_tp_cd: param.cancel_tp_cd,
        cancel_content: param.cancel_content
      }
      if (map.settle_yn == "n") {
        type = "cancel"
      } else if (map.delivery_yn == "n") {
        type = "refund"
      } else if (map.delivery_yn == "y") {
        type = "return"
      }

      if (type) {
        this.rest.requestCancel(data, type).subscribe(
          (res) => {
            if(res.res_code != "ok"){
              alert(res.res_msg)
            }
            this.search();
          });
      }
    });
    popover.present();
  }

  repurchase(map) {
    console.log(map);
    let modal = this.modalCtrl.create(OrderPage, { goods_no: map.goods_no });
    modal.present();
  }

  confirm(map) {
    let popover = this.popoverCtrl.create(OrderConfirmPage);
    popover.onDidDismiss((param) => {
      if(!param){
        return;
      }
      param.order_goods_no = map.order_goods_no;
      param.goods_no = map.goods_no;
      this.rest.showLoading("");
      this.rest.insertGoodsEval(param).subscribe(
        (res)=>{
          this.search();
      });

    });
    popover.present();

  }

  test() {
    let popover = this.popoverCtrl.create(OrderConfirmPage);
    popover.onDidDismiss((param) => {
      if(!param){
        return;
      }
    });
    popover.present();

  }

  addrIsHidden(data){
    if(data.addrHidden == undefined || data.addrHidden == null){
      data.addrHidden = true;
    }
    return data.addrHidden;
  }

  showAddr(data){
    data.addrHidden = !data.addrHidden;
  }

}
