import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';


export type LoginCommand = {
  Identifier: string;
  Password: string;
};

export type RegisterCommand = {
  Fullname: string;
  Email: string;
  Phone: string;
  Password: string;
  ConfirmPassword: string;
};

export type LoginResponse ={
  accessToken:string;
}

export interface AccountApiServiceInteface {
  loginAccount(command: LoginCommand): Observable<LoginResponse>;
  registerAccount(command: RegisterCommand): Observable<void>;
  checkEmailExist(email: string): Observable<boolean>;
  checkPhoneExist(phone: string): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient)=>{
    return environment.production ? new AccountApiService(http): new AccountApiMockService()
  },
  deps:[HttpClient]
})
export class AccountApiService implements AccountApiServiceInteface {
  constructor(protected http: HttpClient) {}
  checkEmailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>('/api/Account/CheckDuplicateEmail', {
      params: { email: email },
    });
  }
  checkPhoneExist(phone: string): Observable<boolean> {
    return this.http.get<boolean>('/api/Account/CheckDuplicatePhone', {
      params: { phone: phone },
    });
  }
  registerAccount(command: RegisterCommand): Observable<void> {
    return this.http.post<void>('/api/Account/Register', command);
  }
  loginAccount(command: LoginCommand): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/Account/Login', command);
  }
}

@Injectable({providedIn:null})
export class AccountApiMockService implements AccountApiServiceInteface {
  constructor() {}
  checkEmailExist(email: string): Observable<boolean> {
    const m = Math.random();
    return of(m > 0.5 ? true: false)
  }
  checkPhoneExist(phone: string): Observable<boolean> {
    const m = Math.random();
    return of(m > 0.5 ? true: false)
  }
  registerAccount(command: RegisterCommand): Observable<void> {
    return of(void 0);
  }
  loginAccount(command: LoginCommand): Observable<LoginResponse> {
    const helper = new JwtHelperService();
    helper.decodeToken()
    const res: LoginResponse = {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTk5fQ.Z4_FVGQ5lIcouP3m4YLMr6pGMF17IJFfo2yOTiN58DY"
    }
    return of(res);
  }
}