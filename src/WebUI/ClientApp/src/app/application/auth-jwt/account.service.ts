import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAPI } from '../../application/constant/apis';

export type LoginCommand = {
  Identifier:string;
  Password: string;
}

export type RegisterCommand={
    Fullname:string;
    Email:string;
    Phone:string;
    Password:string;
    ConfirmPassword:string;
}


export interface AccountServiceInteface {
  login(command: LoginCommand): Observable<string>;
  register(command: RegisterCommand): Observable<void>;
  checkEmailExist(email:string):Observable<boolean>;
  checkPhoneExist(phone:string):Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService implements AccountServiceInteface {

  constructor(
    protected http: HttpClient
  ) { }
  checkEmailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(AccountAPI.CheckEmailExist, {params:{email:email}});
  }
  checkPhoneExist(phone: string): Observable<boolean> {
    return this.http.get<boolean>(AccountAPI.CheckPhoneExist, {params:{phone:phone}});
  }
  register(command: RegisterCommand): Observable<void> {
    return this.http.post<void>(AccountAPI.Register, command);
  }
  login(command: LoginCommand): Observable<string> {
    return this.http.post<string>(AccountAPI.Login, command);
  }

}
