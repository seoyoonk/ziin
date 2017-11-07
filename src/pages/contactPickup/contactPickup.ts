import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest'; 
import { UtilProvider } from '../../providers/util';
import { Contacts, ContactFindOptions } from '@ionic-native/contacts'
@Component({
  selector: 'page-contactPickup',
  templateUrl: 'contactPickup.html'
})
export class ContactPickupPage {
    selContacts = {};
    contactList = [] ;
    contactListOrg = [] ;
    constructor( private viewCtrl: ViewController,  private navParam:NavParams,private rest:RestProvider, 
        private util:UtilProvider, private contacts:Contacts) {
    }
    addContact(data)
    {
        if(data.checked)
        {
            this.selContacts[data.name]=data.mobiles;
        }
        else
        {
            delete this.selContacts[data.name];
        }
    }
    save()
    {
        alert(JSON.stringify(this.selContacts));
        let param = {goods_no: this.navParam.data.goods_no, rcmds:this.selContacts }
        this.rest.insertRcmd(param).subscribe(
            (res)=>
            {
                this.viewCtrl.dismiss();
            },
            (err)=>
            {
                alert(err);
            }
            
        )

    }
    filterItems(ev: any) {
        
        let val = ev.target.value;
        
        if (val && val.trim() !== '') {
          this.contactList = this.contactListOrg.filter(function(item) {
            return item.name.toLowerCase().includes(val.toLowerCase());
          });
        }
      }
    ionViewDidLoad(){
        this.rest.showLoading("연락처 정보 불러 오는 중...");
        let options = new ContactFindOptions();
        
         options.multiple = true;
         let mobiles = [];
         this.contacts.find(['*'],options).then(
             (data)=>{
                 for(let i=0; i < data.length; i++)
                 {
                    let contact : any = {name:data[i].name.formatted, mobiles:[]}
                    
                     var arr = data[i].phoneNumbers;
                     arr.forEach((value, index) => {
                         if(value.value.startsWith("010"))
                         {
                            contact.mobiles.push(this.util.normalizePhone(value.value));
                         }
     
                     });
                     this.contactList.push(contact);
                     this.contactListOrg.push(contact);
                 }
                 this.rest.closeLoading();
             },
             (err) =>
             {
                this.rest.closeLoading();
                alert("에러: " + err);
             }
         );
    }
}
