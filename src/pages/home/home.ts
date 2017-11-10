import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, ModalController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { MyGoodsListPage } from '../myGoodsList/myGoodsList';
import { RestProvider } from '../../providers/rest';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  
  pages:any;

  rootPage:any = ListPage;

  constructor(public navCtrl: NavController,public rest : RestProvider) {
    this.pages = [
      { title: '홈', component: ListPage , icon:'assets/icon/icon_menu_home.png'},
      { title: '나의 주문', component: ListPage , icon:'assets/icon/icon_menu_order.png' },
      { title: '판매관리', component: MyGoodsListPage , icon:'assets/icon/icon_menu_saleMgt.png' },
      { title: '설정', component: ListPage , icon:'assets/icon/icon_menu_setting.png' }
    ];

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  
}
