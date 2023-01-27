import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../utility/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  AccountService,
  LoginCommand,
  RegisterCommand,
} from '../../infrastructure/backend/account.service';
import { KEY_ACCESS_TOKEN, KEY_LAST_PATH } from '../constant';


export interface AuthServiceInterface {
  login(data: LoginCommand): Observable<string>;
  getToken(): string | null;
  checkLoggedInd(): boolean;
  logout(): void;
  register(data: RegisterCommand): Observable<void>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServiceInterface {
  key = KEY_ACCESS_TOKEN;
  constructor(
    private _localstorage: LocalStorageService,
    private _accountAPIService: AccountService
  ) {}
  getToken(): string {
    return this._localstorage.load(this.key);
  }

  checkLoggedInd(): boolean {
    const token = this._localstorage.load(this.key);
    if (token !== null) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (isExpired) {
        return false;
      }
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  logout(): void {
    this._localstorage.remove(this.key);
  }

  register(data: RegisterCommand): Observable<void> {
    return this._accountAPIService.register(data);
  }

  login(data: LoginCommand): Observable<string> {
    return this._accountAPIService.login(data).pipe(
      filter((x) => !!x),
      tap((x) => this._localstorage.save(this.key, x.accessToken)),
      map(x=>this._localstorage.pull(KEY_LAST_PATH) )
    );
  }
}
