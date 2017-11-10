import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';


@Component({
  selector: 'page-myGoodsList',
  templateUrl: 'myGoodsList.html'
})
export class MyGoodsListPage {
  @ViewChild(Nav) nav: Nav;

  listKubun: any = "progressList";
  complateViewYn: boolean = false;
  cancelViewYn: boolean = false;

  progressDataList: any = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  complateDataList: any = [];
  cancelDataList: any = [];

  constructor(public navCtrl: NavController, public rest: RestProvider) {

  }

  ionViewDidLoad() {

  }

  segmentChanged() {
    if (this.listKubun == "complate" && !this.complateViewYn) {
      this.complateViewYn = true;
    } else if (this.listKubun == "cancel" && !this.cancelViewYn) {
      this.cancelViewYn = true;
    }
  }

  scrollEnd(infiniteScroll) {
    switch (this.listKubun) {
      case "progress":

        break;
      case "complate":

        break;
      case "calcel":

        break;
    }
    infiniteScroll.complete();
  }

}
