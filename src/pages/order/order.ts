import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  goods_ea:number = 1;

  ionViewDidLoad() {
      console.log(this.params);
      this.params.data.tot_stock_cnt = 9;
  }
  dismiss()
  {
      this.viewCtrl.dismiss();
  }
  constructor(public viewCtrl: ViewController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {
    
  }

  minusGoodsEa(){
    if(this.goods_ea == 1){
      //can not minus
      alert("1개이상을 구입하셔야합니다.");
      return;
    }
    --this.goods_ea;
  }
  plusGoodsEa(){
    if(this.goods_ea == this.params.data.tot_stock_cnt){
      alert("재고보다 많이 구매하실수 없습니다.");
      //can not plus
      return;
    }
    ++this.goods_ea;
  }

}
