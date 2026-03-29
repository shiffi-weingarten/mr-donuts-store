import { Injectable } from '@angular/core';
import { Activity } from '../components/activity/activity';
import { BehaviorSubject, Observable } from 'rxjs';


export interface ActivityLog {

  date: Date;
  actionName: string;
  productName: string;
}

@Injectable({
  providedIn: 'root',
})

export class ActivityService {
      private logActivity =new BehaviorSubject<ActivityLog[]>([]);
      activityLog$:Observable<ActivityLog[]>=this.logActivity.asObservable();

      constructor(){}

      addLog(actionName:string,productName:string):void{

        const newEntry :ActivityLog={
          date:new Date(),
          actionName : actionName,
          productName:productName
        };

        const currentLog=this.logActivity.getValue();
        currentLog.unshift(newEntry);
        this.logActivity.next(currentLog);
      }
  

    
  clearLog(): void {
    this.logActivity.next([]); 
    console.log("Activity log cleared.");
  }
}


