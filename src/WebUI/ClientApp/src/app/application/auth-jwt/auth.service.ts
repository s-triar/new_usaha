import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { LocalStorageService } from '../utility/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AccountService, LoginCommand, RegisterCommand } from './account.service';


export interface AuthServiceInterface {
  login(data:LoginCommand):Observable<string>;
  getToken():string|null;
  checkLoggedInd():boolean;
  logout():void;
  register(data: RegisterCommand):Observable<void>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface{

  constructor(
    private _localstorage: LocalStorageService,
    private _accountAPIService: AccountService,
  ) { }
  getToken(): string {
    return this._localstorage.load("access_token");
  }

  
  checkLoggedInd(): boolean {
    const token  = this._localstorage.load("access_token");
    if (token !== null ) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if(isExpired){
        return false;
      }
      return true;
    } else {
      this.logout();
      return false;
    }
  }


  logout(): void {
    this._localstorage.remove("access_token");
  }

  register(data: RegisterCommand): Observable<void> {
    return this._accountAPIService.register(data);
  }

  login(data: LoginCommand): Observable<string>{
    return this._accountAPIService.login(data).pipe(
      tap(x=>{
        if(x){
          this._localstorage.save("access_token",x);
        }
      }),
    )
  }


}
