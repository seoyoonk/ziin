import { Component} from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { GoodsProvider } from '../../providers/goods';
import { ImagePicker } from '@ionic-native/image-picker';
@Component({
    template: `
      <ion-list>
        <button ion-item (click)="goCamera()">카메라</button>
        <button ion-item (click)="goGallery()">갤러리</button>
      </ion-list>
    `
  })
  export class PictureSelPopup {
   
    constructor(public viewCtrl: ViewController, private camera: Camera, public goods:GoodsProvider, public imagePicker: ImagePicker) {
        
    }
    goGallery()
    {
      let options = {
        maximumImagesCount: 10,
        width: 800
      };
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.goods.images.push(results[i]);
        }
        this.close();
      }, (err) => { 
        this.close();
        alert(err);
        
      });
    }
    goCamera()
    {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          };
          this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            
            this.goods.images.push(imageData);
            
            this.close();
           }, (err) => {
            this.close();
            alert(err);
           });
    }
    close() {
      this.viewCtrl.dismiss();
    }
  }