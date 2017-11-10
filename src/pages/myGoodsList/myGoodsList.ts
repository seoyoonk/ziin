import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';


@Component({
  selector: 'page-myGoodsList',
  templateUrl: 'myGoodsList.html'
})
export class MyGoodsListPage {
  @ViewChild(Nav) nav: Nav;

  icons:any;

  constructor(public navCtrl: NavController,public rest : RestProvider) {

  }

  segmentChanged(event){
    console.log(event);
  }

}
