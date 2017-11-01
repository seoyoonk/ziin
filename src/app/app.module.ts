import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest';
import { StartProvider } from '../providers/start';
import { HttpModule } from '@angular/http';
import { Sim } from '@ionic-native/sim';
import { KakaoTalk } from 'ionic-plugin-kakaotalk';
import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';
import { WebLoginPage } from '../pages/webLogin/webLogin';
import { FCM } from '@ionic-native/fcm';
@NgModule({
  declarations: [
    MyApp,
    HomePage,WebLoginPage,
    ListPage, RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,WebLoginPage,
    ListPage, RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider, FCM,
    Sim,KakaoTalk,Device,StartProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
