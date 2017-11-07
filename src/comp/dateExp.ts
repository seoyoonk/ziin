import { Component, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
 selector: 'zn-date',
 template: `

 <span [hidden]="day<2">{{val|date:'yyyy-MM-dd'}}</span>
 <span [hidden]="day>=1">{{val|date:'HH:mm'}}</span>
 <span [hidden]="day<1 || day>1">어제 {{val|date:'HH:mm'}}</span>
 `
})
export class ZNDateComponent {
    @Input()  val: number = 0;
    day : number;
    constructor()
    {
        
        
    }
    ngOnInit() { 
      
            
            let today:Date  = new Date();
            let day:Date = new Date(1 * this.val);
            this.day = (today.getTime() - this.val)/(24*60*60*1000);
            if(this.day<1)
            {
                if(today.getDate() != day.getDate())
                {
                   
                    this.day = 1;
                }
            }


        
     }
}

@Component({
    selector: 'zn-chk-today',
    template: `
    
    <span [hidden]="isToday">{{val}}</span>
    <span [hidden]="!isToday">오늘</span>
    `
   })
   export class ZNChkTodayComponent {
       @Input()  val: string;
       isToday : boolean = false;
       constructor()
       {
           
           
       }
       ngOnInit() { 
         
        var datePipe = new DatePipe('ko-KR');
        let today = datePipe.transform(new Date(), 'yyyy-MM-dd');
        if(today == this.val)
        {
            this.isToday = true;
        }
   
   
           
        }
   }
   