import { Injectable, computed, effect, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, filter, map, tap } from 'rxjs';
import { KEY_LAST_PATH } from 'src/app/constants/app';
import { KEY_ACCESS_TOKEN } from 'src/app/constants/auth';
import { LocalStorageService } from 'src/app/utilities/local-storage.service';
import { AccountApiService } from '../apis/account-api.service';


export interface AuthServiceInterface {
  getToken(): string | null;
  checkLoggedInd(): boolean;
  logout(): void;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthServiceInterface {

  user_tokenSg = signal<string | null>(null)

  user_logged_inSg = computed(() => {
    if (this.user_tokenSg() !== null) {
      const helper = new JwtHelperService();
      return helper.decodeToken(this.user_tokenSg()!)
    }
    else {
      return null
    }
  })

  is_token_expiredSg = computed<boolean|null>(()=>{
    if (this.user_tokenSg() !== null) {
      const helper = new JwtHelperService();
      return helper.isTokenExpired(this.user_tokenSg()!)
    }
    else {
      return null
    }
  })


  constructor(
    private _localstorage: LocalStorageService
  ) { 
    // effect(()=> {
    //   if((this.user_tokenSg() == null) || (this.is_token_expired())){
    //     this.logout();
    //   }
    // })
  }

  getToken(): string | null {
    return this.user_tokenSg();
  }

  checkLoggedInd(): boolean {
    return this.is_token_expiredSg() ?? false;
  }

  logout(): void {
    this._localstorage.clear();
  }
}



