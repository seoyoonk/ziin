import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams, PopoverController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-notLogin',
  templateUrl: 'notLogin.html'
})
export class NotLoginPage {


  data: any = { rcmd_mem_nm: 'test', goods_opt_list: [{ sellprice: 0 }], detail_img_list: [] };

  ionViewDidLoad() {
    this.rest.selectOneGoodsRcmd({ goods_no: this.params.data.goods_no }).subscribe(
      res => {
        this.rest.config = res.res_data.config;
        this.data = res.res_data;
        if (res.res_data.detail_img != '') {
          this.data.detail_img_list = this.data.detail_img.split('|').filter(
            (val) => {
              if (val == "") return false;
              else return true;
            });

        }

      },
      err => {
        alert("ERROR!: " + err);
      })

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  constructor(private popoverCtrl:PopoverController, public viewCtrl: ViewController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {
    
  }
  goOrder() {
    let modal = this.modalCtrl.create(OrderPage, this.data);
    modal.present();
  }

}
