import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Sim } from '@ionic-native/sim';
import { RestProvider } from '../providers/rest';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private rest:RestProvider, private sim: Sim) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //this.sim.requestReadPermission();
      //this.getPhoneNumber();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getPhoneNumber()
  {
    this.sim.getSimInfo().then(
      (info) => {
        alert(info.phoneNumber);
        if(info.phoneNumber)
        {
          
          this.rest.appStart(info.phoneNumber).subscribe(
            res => {alert(res.id);
              this.splashScreen.hide();
            },
            err => {
                      alert("ERROR!: " +  err);
                   }
          );;
          
        }
        else
        {
          
          setTimeout(this.getPhoneNumber(), 1000);
        }
      
    });
  }
}
