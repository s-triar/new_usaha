import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { LoginCommand, RegisterCommand } from 'src/app/domain/backend/Commands';
import { ResultUserLogin, ResultWithMessage } from 'src/app/domain/backend/Dtos';
import { AccountService } from 'src/app/infrastructure/backend/account.service';
import { LocalStorageService } from '../utility/local-storage.service';


export interface AuthServiceInterface {
  login(data:LoginCommand):Observable<ResultUserLogin>;
  getToken():string|null;
  checkLoggedInd():boolean;
  logout():void;
  register(data: RegisterCommand):Observable<ResultWithMessage>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface{

  constructor(
    private _localstorage: LocalStorageService,
    private _accountAPIService: AccountService
  ) { }
  getToken(): string {
    return this._localstorage.load("access_token");
  }

  
  checkLoggedInd(): boolean {
    return this._localstorage.load("access_token") !== null;
  }


  logout(): void {
    this._localstorage.remove("access_token");
  }

  register(data: RegisterCommand): Observable<ResultWithMessage> {
    return this._accountAPIService.register(data);
  }

  login(data: LoginCommand): Observable<ResultUserLogin>{
    return this._accountAPIService.login(data).pipe(
      tap(x=>{
        if(x.token){
          this._localstorage.save("access_token",x.token);
        }
      }),
    )
  }


}
