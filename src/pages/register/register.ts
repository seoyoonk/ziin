import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest'; 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  userInfo;
  constructor(    public viewCtrl: ViewController,public rest:RestProvider) {
    this.userInfo = rest.userInfo;

  }
  insertMember()
  {
      
    this.rest.insertMember().subscribe(
        res => {
           
            if(res.res_code == "ok")
            {
                this.viewCtrl.dismiss(res);
                
            }
        },
        err => {
           alert("INSERT MEMBER ERROR!: " +  err);
        }
    );
  }

}
