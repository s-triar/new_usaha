import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountAPI } from '../../application/constant/apis';
import { LoginCommand, RegisterCommand } from '../../domain/backend/Commands';
import { ResultUserLogin, ResultWithMessage } from '../../domain/backend/Dtos';


export interface AccountServiceInteface {
  login(command: LoginCommand): Observable<ResultUserLogin>;
  register(command: RegisterCommand): Observable<ResultWithMessage>;
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
  register(command: RegisterCommand): Observable<ResultWithMessage> {
    return this.http.post<ResultWithMessage>(AccountAPI.Register, command);
  }
  login(command: LoginCommand): Observable<ResultUserLogin> {
    return this.http.post<ResultUserLogin>(AccountAPI.Login, command);
  }

}
