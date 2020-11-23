import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertsModel, AlertType } from './alerts.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  /* 
  The alert service (/src/app/_alert/alert.service.ts) acts as the 
  bridge between any component in an Angular application and the alert component that 
  actually displays the alert / toaster messages. It contains methods for sending, 
  clearing and subscribing to alert messages.

  Credits: https://jasonwatmore.com/post/2019/07/05/angular-8-alert-toaster-notifications
  
  */
  private subject = new Subject<AlertsModel>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<AlertsModel> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    this.alert(new AlertsModel({ ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: any) {
    this.alert(new AlertsModel({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: any) {
    this.alert(new AlertsModel({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: any) {
    this.alert(new AlertsModel({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method    
  alert(alert: AlertsModel) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new AlertsModel({ id }));
  }
}
