import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  dataList:any;

  pages:any;

  ionViewDidLoad(){
    this.rest.selectListGoodsRcmd().subscribe(
      res => {
        console.log(res);
        this.dataList = res.res_data.goods_list;
      },
      err => {
        alert("ERROR!: " + err);
      }
    );
  }

  constructor(public navCtrl: NavController, private modalCtrl : ModalController, public rest : RestProvider) {
    this.pages = [
      { title: '홈', component: HomePage , icon:'assets/icon/icon_menu_home.png'},
      { title: '나의 주문', component: ListPage , icon:'assets/icon/icon_menu_order.png' },
      { title: '판매관리', component: ListPage , icon:'assets/icon/icon_menu_saleMgt.png' },
      { title: '설정', component: ListPage , icon:'assets/icon/icon_menu_setting.png' }
    ];

  }

  openPage(page) {
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
    this.dataList.push(item);
  }

}
