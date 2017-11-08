import { Component, ViewChild } from '@angular/core';
import { ViewController, ModalController, NavParams,Refresher  } from 'ionic-angular';
import { GoodsRegisterPage } from '../goodsRegister/goodsRegister';
import { RestProvider } from '../../providers/rest';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage { 
  @ViewChild('content') contentInput ;
  
  data = {content:'', goods_no:0, parent_sno:0};
  parentComment = {content:'',sno:0};
  comments = [{content:'', mem_nm:'', mem_img:'', reg_dttm:'', eval_score:0}];
  ionViewDidLoad() {
    this.data.goods_no = this.params.data.goods_no;
    this.list(null);
  }
  doRefresh(refresher: Refresher) {
    
       this.list(refresher);
       
  
   }
  list(refresher: Refresher)
  {
    if(refresher == null )
    {
      this.rest.showLoading("데이터 로딩중...");
    }
    this.rest.listComment({goods_no: this.params.data.goods_no,page_no:1, row_count:100} ).subscribe(
      res => {
       
        this.comments = res.res_data.comment_list;
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
      })  
  }
  constructor(private viewCtrl: ViewController, private modalCtrl: ModalController, public rest: RestProvider, public params: NavParams) {
    
    
  
  }
  clearParent()
  {
    this.parentComment.sno = 0;
  }
  goChildComment(data)
  {
    this.parentComment.content = data.content;
    this.parentComment.sno = data.sno;
    
    this.contentInput.setFocus();

  }
  save()
  {
    if(this.parentComment.sno != 0)
    {
      this.data.parent_sno = this.parentComment.sno;
    }
    this.rest.insertComment(this.data).subscribe(
      res=>{
        this.list(null);
      },
      err=>{
        alert("에러 " + err);
      }
    );
  }
  dismiss()
  {
      this.viewCtrl.dismiss();
  }
}
