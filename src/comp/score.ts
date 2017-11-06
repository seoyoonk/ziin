import { Component, Input, Output } from '@angular/core';

@Component({
 selector: 'zn-score',
 template: `
 <span class='zn-score-area'>
 <ion-icon name="ios-star-outline" [hidden]="score >= 1"></ion-icon>
 <ion-icon name="ios-star" [hidden]="score==0"></ion-icon>

 <ion-icon name="ios-star-outline" [hidden]="score >= 2"></ion-icon>
 <ion-icon name="ios-star" [hidden]="score <2"></ion-icon>
 
 <ion-icon name="ios-star-outline" [hidden]="score >= 3"></ion-icon>
 <ion-icon name="ios-star" [hidden]="score<3"></ion-icon>
 
 <ion-icon name="ios-star-outline" [hidden]="score >= 4"></ion-icon>
 <ion-icon name="ios-star" [hidden]="score<4"></ion-icon>
 
 <ion-icon name="ios-star-outline" [hidden]="score >= 5"></ion-icon>
 <ion-icon name="ios-star" [hidden]="score<5"></ion-icon>

 </span>
 `
})
export class ZNScoreComponent {
    @Input()  score: number = 0;
    constructor()
    {
        
        
    }
    ngOnInit() { 
        if(this.score == undefined)
        {
            this.score = 0;
            
        }   
     }
}