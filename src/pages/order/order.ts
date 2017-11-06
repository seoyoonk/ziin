import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  ionViewDidLoad() {
    // this.rest.selectOneGoodsRcmd({} ).subscribe(
    //   res => {
      
    //   },
    //   err => {
    //     alert("ERROR!: " + err);
    //   })
      
  }
  dismiss()
  {
      this.viewCtrl.dismiss();
  }
  constructor(public viewCtrl: ViewController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {
    
  }

}
