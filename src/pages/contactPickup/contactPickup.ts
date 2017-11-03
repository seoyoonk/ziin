import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest'; 

import { Contacts, ContactFindOptions } from '@ionic-native/contacts'
@Component({
  selector: 'page-contactPickup',
  templateUrl: 'contactPickup.html'
})
export class ContactPickupPage {
    selContacts = [];
    contactList = [] ;
    contactListOrg = [] ;
    constructor( private viewCtrl: ViewController,  private rest:RestProvider, private contacts:Contacts) {
    }
    save()
    {
        alert(JSON.stringify(this.selContacts));
    }
    filterItems(ev: any) {
        
        let val = ev.target.value;
        alert(val);
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
                            contact.mobiles.push(value.value);
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
