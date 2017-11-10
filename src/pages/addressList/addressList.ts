import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams, Refresher } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-addressList',
  templateUrl: 'addressList.html'
})
export class AddressListPage {

  searchStr: string;
  page_no: number = 1;

  addrList: Array<{}> = [];

  constructor(private viewCtrl: ViewController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  search() {
    if (this.searchStr && this.searchStr.trim() !== '') {
      this.rest.getAddress(this.searchStr, 1).subscribe(
        (res) => {
          console.log(res);
          this.addrList = res.res_data;
        });
    }
  }
  scrollEnd(infiniteScroll) {
    if (this.searchStr && this.searchStr.trim() !== '') {
      this.rest.getAddress(this.searchStr, ++this.page_no).subscribe(
        (res) => {
          console.log(res);
          this.addrList = this.addrList.concat(res.res_data);
          infiniteScroll.complete();
        });
    }
  }
  addrSelected(item:Object){
    this.viewCtrl.dismiss(item);
  }
}
