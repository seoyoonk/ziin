import { Component, ViewChild } from '@angular/core';
import { Nav, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'orderConfirm.html'
})
export class OrderConfirmPage {
  constructor(public viewCtrl: ViewController) {

  }

  goods_rate = "10" ;
  confirm_content = "";

  close() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.viewCtrl.dismiss({
      eval_score: this.goods_rate,
      content: this.confirm_content
    });
  }
}
