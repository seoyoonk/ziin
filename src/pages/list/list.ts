import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, Refresher } from 'ionic-angular';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';
import { DetailPage } from '../detail/detail';
import { CommentPage } from '../comment/comment';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  dataList:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestProvider, private modalCtrl : ModalController) {
    
    
  }
  doRefresh(refresher: Refresher) {
   
      this.list(refresher);
      
 
  }

  doPulling(refresher: Refresher) {
    
  }
  goGoodsRegister(){
    let modal = this.modalCtrl.create(GoodsRegisterPage);
    modal.present();
    modal.onDidDismiss((data) => {
      this.itemClicked(data);
    });
  }
  goComment(data)
  {
    let modal = this.modalCtrl.create(CommentPage, {goods_no : data.goods_no});
    modal.present();

  }
  itemClicked(item:any){
    let modal = this.modalCtrl.create(DetailPage,item);
    modal.present(); 
  }
  list(refresher: Refresher)
  {
    if(refresher == null ) this.rest.showLoading("데이터 로딩중...");
    this.rest.selectListGoodsRcmd().subscribe(
      res => {
        
        this.dataList = res.res_data.goods_list;
        if(!this.rest.userInfo.mem_img){
          this.rest.userInfo.mem_img = "assets/icon/abstract-user-flat-4.svg"
        }
        if(refresher == null )
        {
          this.rest.closeLoading();
        } 
        else {
          refresher.complete();
        }
      },
      err => {
        if(refresher == null )
        {
          this.rest.closeLoading();
        } 
        else {
          refresher.complete();
        }
        alert("ERROR!: " + err);
      }
    );
  }
  ionViewDidLoad(){
    this.list(null);
  }
}
