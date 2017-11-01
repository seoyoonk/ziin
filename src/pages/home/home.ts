import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  dataList:any;

  pages:any;

  constructor(private navCtrl: NavController, private modalCtrl : ModalController) {
    this.dataList = [];
    for(let i = 0; i < 10; i++){
      this.dataList.push({idx:i});
    }
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goGoodsRegister(){
    let modal = this.modalCtrl.create(GoodsRegisterPage);
    modal.present();
    modal.onDidDismiss((data) => {
      console.log('ziin: afterGoodsRegister ' + JSON.stringify(data));
    });
  }

  itemClicked(item:any){
    this.dataList.push({idx:item.idx});
  }

  reset(){
    this.dataList = [];
    for(let i = 0; i < 10; i++){
      this.dataList.push({idx:i});
    }
  }

}
