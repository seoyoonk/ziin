import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { UtilProvider } from '../../providers/util';
import { AddressListPage } from '../addressList/addressList';
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  goods_ea: number = 1;
  settle_tp: any = "C";
  dlvAddrRadio: any;
  dlvAddrDataList: any = {};
  dlvAddrData: any = {};
  searchData: any = {};
  orderer_nm: any;
  orderer_mobile: any;

  ionViewDidLoad() {
    this.rest.selectOrderDeliveryAddr().subscribe(
      (res) => {
        this.dlvAddrDataList = res.res_data;
        if (this.dlvAddrDataList.dft_delivery_addr) {
          this.dlvAddrRadio = "dft";
          this.util.objectClone(this.dlvAddrDataList.dft_delivery_addr, this.dlvAddrData);
        } else if (this.dlvAddrDataList.recent_order_delivery_addr) {
          this.dlvAddrRadio = "rct";
          this.util.objectClone(this.dlvAddrDataList.recent_order_delivery_addr, this.dlvAddrData);
        } else {
          this.dlvAddrRadio = "old";
        }
      },
      (err) => {

      });
    console.log(this.params);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  constructor(public viewCtrl: ViewController, private util: UtilProvider, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {

  }

  minusGoodsEa() {
    if (this.goods_ea == 1) {
      alert("1개이상을 구입하셔야합니다.");
      return;
    }
    --this.goods_ea;
  }
  plusGoodsEa() {
    if (this.goods_ea == this.params.data.tot_stock_cnt) {
      alert("재고보다 많이 구매하실수 없습니다.");
      return;
    }
    ++this.goods_ea;
  }

  searchAddr() {
    let modal = this.modalCtrl.create(AddressListPage);
    modal.onDidDismiss(data => {
      this.dlvAddrData.receiver_zipcode = data.postcd;
      this.dlvAddrData.receiver_addr_1 = data.address;
    });
    modal.present();
  }
  radioSelect() {
    switch (this.dlvAddrRadio) {
      case "dft":
        this.util.objectClone(this.dlvAddrDataList.dft_delivery_addr, this.dlvAddrData);
        break;
      case "rct":
        this.util.objectClone(this.dlvAddrDataList.recent_order_delivery_addr, this.dlvAddrData);
        break;
      case "new":
        this.dlvAddrData = {};
        break;
    }
  }

  order() {
    if (!this.dlvAddrData.receiver_nm || this.dlvAddrData.receiver_nm.trim() == "") {
      alert("성명은 필수값입니다.");
      return;
    } else if (!this.dlvAddrData.receiver_mobile || this.dlvAddrData.receiver_mobile.trim() == "") {
      alert("연락처는 필수값입니다.");
      return;
    } else if (!this.dlvAddrData.receiver_zipcode || this.dlvAddrData.receiver_zipcode.trim() == "") {
      alert("우편번호는 필수값입니다.");
      return;
    } else if (!this.dlvAddrData.receiver_nm || this.dlvAddrData.receiver_addr_1.trim() == "") {
      alert("기본주소는 필수값입니다.");
      return;
    } else if (!this.dlvAddrData.receiver_nm || this.dlvAddrData.receiver_addr_2.trim() == "") {
      alert("상세주소는 필수값입니다.");
      return;
    } else if (this.util.mobileCheck(this.dlvAddrData.receiver_mobile)) {
      alert("연락처 형식이 아닙니다 다시 입력해주세요.");
      return;
    }
    if (this.rest.userInfo.mem_no == '') {
      if (this.orderer_nm || this.orderer_nm.trim() == '') {
        alert("주문자 이름은 필수값입니다.");
        return;
      } else if (this.orderer_mobile || this.orderer_mobile.trim() == '') {
        alert("주문자 연락처는 필수값입니다.");
        return;
      } else if (this.util.mobileCheck(this.orderer_mobile)) {
        alert("연락처 형식이 아닙니다 다시 입력해주세요.");
        return;
      }

    }
    let order_amnt = this.goods_ea * this.params.data.goods_opt_list[0].sellprice
    let data = {
      order_item_list: [{
        goods_no: this.params.data.goods_no
        , opt_no: this.params.data.goods_opt_list[0].opt_no
        , order_ea: this.goods_ea
      }]
      , receiver_nm: this.dlvAddrData.receiver_nm.trim()
      , receiver_zipcode: this.dlvAddrData.receiver_zipcode.replace(/-/gi, "").trim()
      , receiver_addr_tp: 1
      , receiver_addr_1: this.dlvAddrData.receiver_addr_1
      , receiver_addr_2: this.dlvAddrData.receiver_addr_2.trim()
      , receiver_mobile: this.dlvAddrData.receiver_mobile.trim()
      , receiver_phone: this.dlvAddrData.receiver_mobile.trim()
      , settle_tp: this.settle_tp
      , order_amnt: order_amnt
      , settle_amnt: order_amnt
      , order_goods_amnt: order_amnt
    };
    this.rest.requestOrder(data).subscribe(
      (res) => {
        if (res.res_code != 'ok') {
          alert(res.res_msg);
          return;
        }
      });
  }

}
