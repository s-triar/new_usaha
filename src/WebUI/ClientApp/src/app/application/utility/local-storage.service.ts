import { Injectable } from '@angular/core';


export interface LocalStorageServiceInterface{
  save(key:string, data:String):void;
  load(key:string):string|null;
  remove(key:string):void;
  clear():void;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements LocalStorageServiceInterface{

  constructor() { }

  save(key:string, data:string):void{
    localStorage.setItem(key, data);
  }

  load(key:string):string|null{
    return localStorage.getItem(key);
  }

  remove(key):void{
    localStorage.removeItem(key);
  }

  clear():void{
    localStorage.clear();
  }
}
