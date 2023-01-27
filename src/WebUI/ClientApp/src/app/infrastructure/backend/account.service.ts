import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { AccountAPI } from '../../core/constant/apis';

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

export interface AccountServiceInteface {
  login(command: LoginCommand): Observable<LoginResponse>;
  register(command: RegisterCommand): Observable<void>;
  checkEmailExist(email: string): Observable<boolean>;
  checkPhoneExist(phone: string): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService implements AccountServiceInteface {
  constructor(protected http: HttpClient) {}
  checkEmailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(AccountAPI.CheckEmailExist, {
      params: { email: email },
    });
  }
  checkPhoneExist(phone: string): Observable<boolean> {
    return this.http.get<boolean>(AccountAPI.CheckPhoneExist, {
      params: { phone: phone },
    });
  }
  register(command: RegisterCommand): Observable<void> {
    return this.http.post<void>(AccountAPI.Register, command, {context: setErrorDialogContext()});
  }
  login(command: LoginCommand): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(AccountAPI.Login, command, {context: setErrorDialogContext()});
  }
}
