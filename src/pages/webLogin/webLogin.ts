import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { RegisterPage } from '../../pages/register/register';
import { HomePage } from '../../pages/home/home';
import { ModalController } from 'ionic-angular';
@Component({
  selector: 'page-webLogin',
  templateUrl: 'webLogin.html'
})
export class WebLoginPage {
  loginInfo:any = {email:'mimela98@gmail.com', pwd:'fliconz'}
  constructor(public navCtrl: NavController, private rest:RestProvider, private modalCtrl:ModalController) {


  }
  login()
  {
    this.rest.login(this.loginInfo).subscribe(
      (res)=>{
        if(res.res_code == 'ok')
        {
          
          this.navCtrl.setRoot(HomePage);
        }
        else
        {
          alert("로그인에 실패하였습니다.")
        }
      } ,
      (err)=>alert(err)
    )  ;
  }

  goRegister() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
    modal.onDidDismiss((data) => {
        if(data.res_code == 'ok')
        {
          this.navCtrl.setRoot(WebLoginPage);
        }
    });
  }
}