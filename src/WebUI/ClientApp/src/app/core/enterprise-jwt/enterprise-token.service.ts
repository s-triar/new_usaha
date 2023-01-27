import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LocalStorageService } from 'src/app/core/utility/local-storage.service';

export type EnterpriseTokenModel = {
  EnterpriseId: string;
  UserId: string;
  RoleId: string;
  Expires: string;
  Issuer: string;
  Audience: string;
  SigningCredentials: string;
};

export interface EnterpriseTokenServiceInterface {
  setItem(token:string): void;
  getTokenAsString():string|null;
  getTokenObject():EnterpriseTokenModel|null;
}


@Injectable({
  providedIn:'root'
})
export class EnterpriseTokenService implements EnterpriseTokenServiceInterface{

  key = 'enterprise_access_token';

  constructor(private _localStorageService:LocalStorageService) { }

  setItem(token: string): void{
    this._localStorageService.save(this.key, token);
  }

  getTokenAsString(): string|null{
    return this._localStorageService.load(this.key);
  }
  getTokenObject(): EnterpriseTokenModel|null{
    const t = this.getTokenAsString();
    if (t !== null){
      return jwt_decode(t);
    }
    return null;
  }
}
