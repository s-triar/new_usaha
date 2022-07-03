import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnterpriseAPI } from 'src/app/application/constant/apis';
import { MyEnterpriseDto } from 'src/app/domain/backend/Dtos';
import { CheckAvailableEnterpriseCodeQuery, GetMyEnterprisesQuery } from 'src/app/domain/backend/Queries';


export interface MyBussinessServiceInterface{
  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>;
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseDto[]>;
  create(data: FormData): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class MyBussinessService  implements MyBussinessServiceInterface{

  constructor(protected http: HttpClient) {
  }

  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>{
    return this.http.get<boolean>(EnterpriseAPI.CheckAvailableEnterpriseCode, {params:  query });
  }
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseDto[]>{
    return this.http.get<MyEnterpriseDto[]>(EnterpriseAPI.GetOwned, {params:  query });
  }
  create(data: FormData): Observable<string>{
    return this.http.post<string>(EnterpriseAPI.Create, data);
  }
}
