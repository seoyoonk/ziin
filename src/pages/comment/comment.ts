import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage { 

  
  comments = [{content:'', mem_nm:'박민우', mem_img:'', reg_dttm:'', eval_score:5}];
  ionViewDidLoad() {
  
      this.rest.listComment({goods_no: this.params.data.goods_no,page_no:1, row_count:100} ).subscribe(
        res => {
         
          //this.comments = res.res_data;
        
        },
        err => {
          alert("ERROR!: " + err);
        })  
  }

  constructor(private viewCtrl: ViewController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {
    
    
  
  }
  dismiss()
  {
      this.viewCtrl.dismiss();
  }
}
