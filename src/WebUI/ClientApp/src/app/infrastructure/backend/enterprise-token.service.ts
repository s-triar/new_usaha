import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

export type EnterpriseTokenModel = {
  EnterpriseId: string;
  UserId: string;
  RoleId: string;
  Expires: string;
  Issuer: string;
  Audience: string;
  SigningCredentials: string;
};


@Injectable({
  providedIn: 'root'
})
export class EnterpriseTokenService {

  key = 'enterprise_access_token';

  constructor() { }

  setItem(token: string): void{
    console.log(token);
    window.localStorage.setItem(this.key, token);
  }

  getTokenAsString(): string|null{
    return window.localStorage.getItem(this.key);
  }
  getTokenObject(): EnterpriseTokenModel|null{
    const t = this.getTokenAsString();
    if (t !== null){
      return jwt_decode(t);
    }
    return null;
  }
}
