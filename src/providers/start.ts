import { Injectable,ViewChild } from '@angular/core';

import { Sim } from '@ionic-native/sim';

import { KakaoTalk } from 'ionic-plugin-kakaotalk';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../providers/rest';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController, App, ModalController } from 'ionic-angular';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';



import 'rxjs/add/operator/map';
declare var FCMPlugin;
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StartProvider {
  @ViewChild('myNav') nav: NavController;
  donePhone : boolean = false;
  doneSNSLogin : boolean = false;
  donePushToken : boolean = false;
  splashScreen : SplashScreen ;
  constructor(private app:App, private device:Device, private modalCtrl:ModalController,
    public kakao:KakaoTalk, public rest : RestProvider , private storage: Storage, 
    private sim: Sim) {
        this.rest.deviceInfo.device_id=this.device.uuid;
        this.rest.deviceInfo.os_type = this.device.platform;
        this.rest.deviceInfo.os_ver = this.device.version;
  }

  getFCMToken()
  {
    if(typeof(FCMPlugin) !== "undefined"){
        FCMPlugin.getToken( token => {
                console.log("ziin: get push token : " + token);
                this.rest.userInfo.push_token=token;
                this.donePushToken = true;
                this.appStart(false);
                
            }
        );
    }
    else{
        console.log("ziin: get push token fail");
        this.donePushToken = true;
    }
  }

  goHome()
  {
    if(this.splashScreen != null) this.splashScreen.hide();
    
    this.app.getRootNav().setRoot(HomePage).then(data => {
        console.log("ziin: gohome" + data);    
    }, (error) => {
        alert("goHome " + error);
    })
  }
  onStart(splashScreen: SplashScreen)
  {
    console.log("ziin: onStart");     
    if(typeof(FCMPlugin) !== "undefined"){
        FCMPlugin.onNotification( data => alert(JSON.stringify(data)));
    }
    this.splashScreen = splashScreen;
    
    this.storage.get('auth_token').then((val) => {
        
        if(val == null)
        {
            console.log("ziin: auth_token is null");    
            this.sim.requestReadPermission();
            this.getFCMToken();
            this.getPhoneNumber();
            this.kakaoLogin();
            
        }
        else{
            this.rest.deviceInfo.auth_token = val;
            this.doneSNSLogin = true;
            this.donePhone = true;
            this.donePushToken = true;
            
            console.log("ziin: auth_token :" + val);
            this.appStart(false);
        }
      });
  }
  goRegister() {
    if(this.splashScreen != null) this.splashScreen.hide();
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
    modal.onDidDismiss((data) => {
        console.log("ziin: after register: " + JSON.stringify(data))
        if(data.res_code == 'ok')
        {
            console.log("ziin: register success");
            this.storage.set("auth_token", this.rest.deviceInfo.auth_token);
            this.goHome();
        }
        else
        {
            alert(JSON.stringify(data));
        }
    });
    
  }
  appStart(isNew : boolean)
  {
   
    if(this.doneSNSLogin && this.donePhone && this.donePushToken )
    {
        if(!isNew)
        {
           
            this.rest.showLoading("로그인 중입니다.");
        }  
        this.rest.appStart().subscribe(
        res => {
          this.rest.closeLoading();
          if(res.result_code==0)  // 로그인 성공
          {
         
            this.storage.set("auth_token", this.rest.deviceInfo.auth_token);
            this.goHome();
          }
          else if(res.result_code==-2)  // 로그인 실패
          {
            this.storage.remove('auth_token');
            this.onStart(this.splashScreen);
          }
          else // 존재하지 않는 사용자
          {
            
            this.goRegister();
            
          }
        },
        err => {
            this.rest.closeLoading();
            alert("ERROR!: " +  err);
        }
      );;
    }
  }
  kakaoLogin()
  {
    console.log("ziin: kakao login start");
    this.kakao.login().then
    (
      (result)=>{
        console.log("ziin: kakao login ok");
        this.rest.userInfo.email = result.email;
        this.rest.userInfo.sns = "kakao";
        this.rest.userInfo.mem_nm = result.nickname;
        this.rest.userInfo.sns_id = result.id;
        this.rest.userInfo.mem_img = result.profile_image;
        this.doneSNSLogin = true;
        this.appStart(true);
      },
      (message)=> {
        alert("kakao login fail" + JSON.stringify(message));
      }
    );
  }
  getPhoneNumber()
  {
    console.log("ziin: get phone number start");
    this.sim.getSimInfo().then(
      (info) => {
        
        if(info.phoneNumber)
        {
          console.log("ziin: get phone number ok");
          this.donePhone = true;
          let phone : string; 
          if(info.phoneNumber.startsWith("+82"))
          {
              phone = "0" + info.phoneNumber.substring(3,5) + "-" + info.phoneNumber.substring(5,info.phoneNumber.length-4) + "-" + info.phoneNumber.substring(info.phoneNumber.length-4,info.phoneNumber.length);
          }
          this.rest.userInfo.mobile = phone;
          this.appStart(true);
        }
        else
        {
          
          setTimeout(this.getPhoneNumber(), 1000);
        }
      
    });
  }
}