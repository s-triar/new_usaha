import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEnterpriseAPI } from 'src/app/application/constant/apis';
import { MyEnterpriseContainerDto, MyEnterpriseDto } from 'src/app/domain/backend/Dtos';
import { CheckAvailableEnterpriseCodeQuery,  GetMyEnterprisesSearchQuery } from 'src/app/domain/backend/Queries';


export interface MyBussinessServiceInterface{
  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>;
  getOwned(query: GetMyEnterprisesSearchQuery): Observable<MyEnterpriseContainerDto>;
  create(data: FormData): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class MyBussinessService  implements MyBussinessServiceInterface{

  constructor(protected http: HttpClient) {
  }

  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>{
    return this.http.get<boolean>(MyEnterpriseAPI.CheckAvailableEnterpriseCode, {params:  query });
  }
  getOwned(query: GetMyEnterprisesSearchQuery): Observable<MyEnterpriseContainerDto>{
    console.log("afiafgiaebfiaeugfeaibeahi");
    return this.http.get<MyEnterpriseContainerDto>(MyEnterpriseAPI.GetOwned, {params:  query });
  }
  create(data: FormData): Observable<string>{
    return this.http.post<string>(MyEnterpriseAPI.Create, data);
  }
}
