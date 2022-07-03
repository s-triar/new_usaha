import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppViewService {
  device: BehaviorSubject<string> = new BehaviorSubject<string>('web');
  constructor() { }
}
