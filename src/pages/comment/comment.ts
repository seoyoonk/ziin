import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams } from 'ionic-angular';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage { 

  data = {content:'', goods_no:0, parent_sno:0};
  comments = [{content:'', mem_nm:'박민우', mem_img:'', reg_dttm:'', eval_score:5}];
  ionViewDidLoad() {
    this.data.goods_no = this.params.data.goods_no;
    this.list();
  }
  list()
  {
    this.rest.listComment({goods_no: this.params.data.goods_no,page_no:1, row_count:100} ).subscribe(
      res => {
       
        this.comments = res.res_data.comment_list;
        
      },
      err => {
        alert("ERROR!: " + err);
      })  
  }
  constructor(private viewCtrl: ViewController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {
    
    
  
  }
  save()
  {
    this.rest.insertComment(this.data).subscribe(
      (res)=>{
        this.list();
      },
      (err)=>{
        alert("에러 " + err);
      }
    );
  }
  dismiss()
  {
      this.viewCtrl.dismiss();
  }
}
