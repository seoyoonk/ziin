import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';
import { DetailPage } from '../detail/detail';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  dataList:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestProvider, private modalCtrl : ModalController) {
    
    
  }
  goGoodsRegister(){
    let modal = this.modalCtrl.create(GoodsRegisterPage);
    modal.present();
    modal.onDidDismiss((data) => {
      console.log('ziin: afterGoodsRegister ' + JSON.stringify(data));
    });
  }

  itemClicked(item:any){
    let modal = this.modalCtrl.create(DetailPage,item);
    modal.present(); 
  }

  ionViewDidLoad(){
    this.rest.selectListGoodsRcmd().subscribe(
      res => {
        console.log(res);
        this.dataList = res.res_data.goods_list;
        if(!this.rest.userInfo.mem_img){
          this.rest.userInfo.mem_img = "assets/icon/abstract-user-flat-4.svg"
        }
        console.log(this.rest.userInfo)
      },
      err => {
        alert("ERROR!: " + err);
      }
    );
  }
}
