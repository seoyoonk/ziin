import { Component } from '@angular/core';
import { ViewController,PopoverController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { RestProvider } from '../../providers/rest'; 
import { UtilProvider } from '../../providers/util';
import { PictureSelPopup } from '../popup/pictureSel';
import { RcmdSelPopup } from '../popup/rcmdSel';
import { Contacts } from '@ionic-native/contacts';

@Component({
  selector: 'page-goodsRegister',
  templateUrl: 'goodsRegister.html'
})
export class GoodsRegisterPage {

    goodsInfo:any = {goods_nm:'',detail_img : [],  list_img_1:{ file_nm :'list.jpg',   stream_string :'' },       detail_desc:'', goods_opt_list :[{opt_nm_1:"1",main_yn:"y"}]}; 
    images;
    minDate: Date;
    maxDate: Date;
    isNew :boolean = true;
    response : any = {goods_no:683, list_img_1:'/2017/10/20/c4127d71-03ff-44d7-8502-be802c759d9a.PNG'}
    constructor( private viewCtrl: ViewController, private popoverCtrl: PopoverController, private rest:RestProvider,
        private util:UtilProvider, private contacts:Contacts, private file : File) {
        this.images = util.images;
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() + 1);
        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);
    }
    delImage(idx)
    {
      this.images.splice(idx, 1);
      
    }
    showPictureSel()
    {
      let popover = this.popoverCtrl.create(PictureSelPopup);
      popover.present();
    }
    showRcmdSel()
    {
        let popover = this.popoverCtrl.create(RcmdSelPopup,this.response);
        popover.present();
        popover.onDidDismiss((data)=>{
            this.viewCtrl.dismiss(this.response);
        })
    }
    convert(field, event: any) {
        if(field=='sellprice')
        {
            this.goodsInfo.goods_opt_list[0].sellprice= this.util.formatNumber(event.target.value);
        }
        else
        {
            this.goodsInfo[field] = this.util.formatNumber(event.target.value);
        }
    }
    findContact()
    {
        this.contacts.pickContact().then(
            (contact)=>{
                this.goodsInfo.producer_nm = contact.name.formatted;
                var arr = contact.phoneNumbers;
                arr.forEach((value, index) => {
                    if(value.value.startsWith("010"))
                    {
                        this.goodsInfo.producer_tel = this.util.normalizePhone(value.value);
                        return;
                    }

                })
                
                console.log('The following contact has been selected:' + JSON.stringify(contact));
            },
            (err)=>{
                alert ('Contact Error: ' + err);
            }
        );
    }

    save()
    {
        if(this.goodsInfo.goods_nm=='')   
        {
            alert("상품명을 입력하세요.");
            return ;
        }
        if(this.goodsInfo.detail_desc=='')   
        {
            alert("설명을 입력하세요.");
            return ;
        }
        
        if(this.goodsInfo.goods_opt_list[0].sellprice=='')
        {
            alert("가격을 입력하세요.");
            return ;
        }
        if(this.goodsInfo.max_order_cnt=='' || this.goodsInfo.max_order_cnt==0)
        {
            alert("수량을 1개 이상 입력하세요.");
            return ;
        }
        
        if(this.images.length == 0)
        {
            alert("상품 사진을 한개이상 선택하세요.");
            return ;
        }
        this.goodsInfo.goods_opt_list[0].sellprice =  this.goodsInfo.goods_opt_list[0].sellprice.replace(/,/g,'');
        this.goodsInfo.max_order_cnt =  this.goodsInfo.max_order_cnt.replace(/,/g,'');
        if(this.goodsInfo.refund_yn_b)
        {
            this.goodsInfo.refund_yn='y';
        }
        else
        {
            this.goodsInfo.refund_yn='n';
        }
        if(this.goodsInfo.exchange_yn_b)
        {
            this.goodsInfo.exchange_yn='y';
        }
        else
        {
            this.goodsInfo.exchange_yn='n';
        }

        let idx:number = 0;
        this.rest.showLoading("저장 중입니다...");
        for (var i = 0; i < this.images.length; i++) {
            let pos : number = this.images[i].lastIndexOf("/");
            let path : string = this.images[i].substring(0, pos);
            let fileName : string = this.images[i].substring(pos+1);
            this.file.readAsDataURL(path, fileName).then(
              (data)=>{
               
                pos = data.indexOf(",");
                let imgInfo : any = new Object();
                imgInfo.file_nm = fileName;
                imgInfo.stream_string = data.substring(pos+1);
                this.goodsInfo.detail_img.push(imgInfo);
                
                idx++;
                if(idx==this.images.length)
                {
                    this.sendServer();
                }
              },
              (err)=>{
                this.rest.closeLoading();
                alert(err);
              }
            );
            
          }
      
        
        
    }

    sendServer()
    {
        this.rest.insertGoods(this.isNew, this.goodsInfo).subscribe(
            (res)=>{
                this.rest.closeLoading();
                this.response = res;
                this.response.goods_nm = this.goodsInfo.goods_nm;
                if(res.res_code=="ok")
                {
                    this.util.images = [];
                    if(confirm("다른 사람에게 추천하시겠습니까?"))
                    {
                        this.showRcmdSel();
                    }
                    else{
                        this.viewCtrl.dismiss(this.response);
                    }
                }    
                alert(JSON.stringify(res));
            },
            (err)=>{
                this.rest.closeLoading();
                alert("저장 오류" + err);
            }
        ) ;
    }
    dismiss()
    {
        this.viewCtrl.dismiss();
    }

}