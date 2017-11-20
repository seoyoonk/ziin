import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { OrderPage } from '../pages/order/order';
import { MyOrderListPage } from '../pages/myOrderList/myOrderList';
import { AddressListPage } from '../pages/addressList/addressList';
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
import { NotLoginPage } from '../pages/notLogin/notLogin';
import { ContactPickupPage } from '../pages/contactPickup/contactPickup';
import { GoodsRegisterPage } from '../pages/goodsRegister/goodsRegister';
import { CommentPage } from '../pages/comment/comment';
import { FCM } from '@ionic-native/fcm';
import { Contacts } from '@ionic-native/contacts';
import { TextMaskModule } from 'angular2-text-mask';
import { Camera } from '@ionic-native/camera'
import { UtilProvider } from '../providers/util';
import { ImagePicker } from '@ionic-native/image-picker';
import { PictureSelPopup } from '../pages/popup/pictureSel';
import { RcmdSelPopup } from '../pages/popup/rcmdSel';
import { OrderCancelPage } from '../pages/popover/orderCancel';
import { OrderConfirmPage } from '../pages/popover/orderConfirm';
import { File } from '@ionic-native/file';
import { ZNScoreComponent } from '../comp/score';
import { ZNDateComponent, ZNChkTodayComponent, ZNDateFormatComponent } from '../comp/dateExp';
@NgModule({
  declarations: [
    MyApp,
    HomePage, WebLoginPage, PictureSelPopup, RcmdSelPopup, DetailPage, OrderPage,
    ListPage, RegisterPage, GoodsRegisterPage, ContactPickupPage, CommentPage, ZNScoreComponent,
    OrderPage, ZNDateComponent, ZNChkTodayComponent, ZNDateFormatComponent, NotLoginPage, AddressListPage, 
    MyOrderListPage, OrderCancelPage, OrderConfirmPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TextMaskModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, PictureSelPopup, RcmdSelPopup, DetailPage, OrderPage,
    HomePage, WebLoginPage, ContactPickupPage, CommentPage, ListPage, 
    RegisterPage, GoodsRegisterPage, OrderPage, NotLoginPage, AddressListPage, 
    MyOrderListPage, OrderCancelPage, OrderConfirmPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider, FCM, File,
    Sim, KakaoTalk, Device, StartProvider, Contacts, Camera, ImagePicker, UtilProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
