import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController, NavParams } from 'ionic-angular';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  @ViewChild(Nav) nav: Nav;

  data: Object;

  ionViewDidLoad() {
    this.rest.selectOneGoodsRcmd(this.params.get("goods_no")).subscribe(
      res => {
        console.log(res);
        this.data = res.res_data;
      },
      err => {
        alert("ERROR!: " + err);
      })
  }

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {
  }

}
