import { Component, ViewChild } from '@angular/core';
import { Nav, NavController } from 'ionic-angular';
import { ListPage } from '../list/list';
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
      },
      err => {
        alert("ERROR!: " + err);
      }
    );
    this.dataList = [];
  }

  constructor(public navCtrl: NavController, public rest : RestProvider) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  itemClicked(item:any){
    this.dataList.push({idx:item.idx});
  }

}
