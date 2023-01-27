import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppViewServiceInterface{
  setDevice(screen):void;
  getDevice():Observable<string>
}

@Injectable({
  providedIn: 'root'
})
export class AppViewService implements AppViewServiceInterface{
  private device: BehaviorSubject<string> = new BehaviorSubject<string>('web');
  constructor() { }

  getDevice(): Observable<string> {
    return this.device.asObservable();
  }

  setDevice(screen):void{
    this.device.next(screen);  
  }

}
