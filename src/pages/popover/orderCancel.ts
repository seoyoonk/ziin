import { Component, ViewChild } from '@angular/core';
import { Nav, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'orderCancel.html'
})
export class OrderCancelPage {
  constructor(public viewCtrl: ViewController) {

  }

  cancel_tp_cd = "1";
  cancel_content;

  close() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.viewCtrl.dismiss({
      cancel_tp_cd: this.cancel_tp_cd,
      cancel_content : this.cancel_content
    });
  }
}
