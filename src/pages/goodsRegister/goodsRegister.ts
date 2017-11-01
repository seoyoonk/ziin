import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest'; 
import { Contacts } from '@ionic-native/contacts'
@Component({
  selector: 'page-goodsRegister',
  templateUrl: 'goodsRegister.html'
})
export class GoodsRegisterPage {

    goodsInfo:any = {}; 
    mask =['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    
    constructor( private viewCtrl: ViewController, private rest:RestProvider, private contacts:Contacts) {
        
    
    }
    convert(field, event: any) {
        this.goodsInfo[field] = this.rest.formatNumber(event.target.value);
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
                        this.goodsInfo.producer_tel = value.value;
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
    register()
    {
        
    }
    dismiss()
    {
        this.viewCtrl.dismiss();
    }

}