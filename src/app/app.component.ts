import { Component, ViewChild  } from '@angular/core';
import { ToastController,  Platform , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StartProvider } from '../providers/start';

 
import { WebLoginPage } from '../pages/webLogin/webLogin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any ;


  @ViewChild(Nav) nav: Nav;
  
  constructor(private platform: Platform, private toastCtrl:ToastController,private statusBar: StatusBar, 
    private splashScreen: SplashScreen, private start:StartProvider) {
    
    this.initializeApp();

   

  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    
      this.statusBar.styleDefault();
      var lastTimeBackPress = 0;
      var timePeriodToExit  = 2000;

      this.platform.registerBackButtonAction(() => {
           if (!this.nav.canGoBack()) {
              //Double check to exit app
              if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                  this.platform.exitApp(); //Exit from app
              } else {
                  let toast = this.toastCtrl.create({
                      message:  'Press back again to exit App?',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                  lastTimeBackPress = new Date().getTime();
              }
          } else {
              // go to previous page
              this.nav.pop();
          }
      });
      
      if(this.platform.is("cordova"))
      {
        
        this.start.onStart(this.splashScreen);
      }
      else
      {
        
        this.rootPage = WebLoginPage;
      }
      
    });
  }

  

  
}
