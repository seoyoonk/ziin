import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController } from 'ionic-angular';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, private modalCtrl : ModalController, public rest : RestProvider) {
    
  }

}
