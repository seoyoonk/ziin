import { Component} from '@angular/core';
import { ViewController, NavParams, ModalController } from 'ionic-angular';

import { KakaoTalk } from 'ionic-plugin-kakaotalk';
import { RestProvider } from '../../providers/rest'; 
import { ContactPickupPage } from '../contactPickup/contactPickup';
@Component({
    template: `
      
      <ion-textarea style="height:10em" placeholder="추천 메시지를 적어주세요" [(ngModel)]="reason"></ion-textarea>
      <ion-list radio-group [(ngModel)]="target">
      <ion-item>
        <ion-label>연락처</ion-label>
        <ion-radio value="contact" checked></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>카카오톡</ion-label>
        <ion-radio value="kakao"></ion-radio>
      </ion-item>
      </ion-list>
      <button ion-button color="primary" block (click)=run()>추천</button>
    `
  })
  export class RcmdSelPopup {
      
    reason 
    target="kakao";
    
    constructor(public viewCtrl: ViewController,  private kakao:KakaoTalk, private rest:RestProvider, private navParam:NavParams, private modalCtrl:ModalController) {
        this.reason = this.navParam.data.goods_nm +"(가격:" + this.navParam.data.sellprice + ") 추천합니다.";
    }
    goContactPickup(){
        let modal = this.modalCtrl.create(ContactPickupPage, this.navParam.data);
        modal.present();
        modal.onDidDismiss((data) => {
          console.log('ziin: afterGoodsRegister ' + JSON.stringify(data));
        });
      }
    run()
    {
        if(this.target=="kakao")
        {
            this.shareKakao();
        }
        else{
            this.shareContact();
        }
    }
    shareContact()
    {
        this.goContactPickup();
    }
    shareKakao()
    {
        
        let options:any ={
            text : this.reason,
            image : {
              src : this.rest.config.img_goods_root_path + this.navParam.get("list_img_1"),
              width : 138, 
              height : 90,
            },
            weblink :{
              url : this.rest.config.goods_not_login + "goods_no=" + this.navParam.get("goods_no") + "&from=" + this.rest.userInfo.mem_no,
              text : '[지인마켓] 상품 페이지로 이동'
            }
        };    
        
        this.kakao.share(options).then((data)=>{
            this.viewCtrl.dismiss();
        }, 
        (err)=>{
            alert("에러" + err);
        })
    }
}