import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEnterpriseAPI } from 'src/app/application/constant/apis';
import { showErrorDialogContext } from 'src/app/application/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/application/utility/form-conversion.service';
import { MyEnterpriseDto, EnterpriseTokenDto, MyEnterpriseContainerDto } from 'src/app/domain/backend/Dtos';
import { CheckAvailableEnterpriseCodeQuery, GetMyEnterprisesQuery, GetAvailableEnterpriseCodeQuery, EnterpriseTokenQuery, GetMyEnterpriseInfoQuery } from 'src/app/domain/backend/Queries';

export interface MyEnterpriseServiceInterface{
  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>;
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseContainerDto>;
  create(data: FormData): Observable<string>;
  GetAvailableEnterpriseCode(query: GetAvailableEnterpriseCodeQuery): Observable<string[]>;
  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenDto>;
  getMyEnterpriseInfo(query: GetMyEnterpriseInfoQuery): Observable<MyEnterpriseDto>;
}

@Injectable({
  providedIn: 'root'
})
export class MyEnterpriseService  implements MyEnterpriseServiceInterface{

  constructor(protected http: HttpClient, private utilService: FormConversionService) {

  }
  getMyEnterpriseInfo(query: GetMyEnterpriseInfoQuery): Observable<MyEnterpriseDto> {
    return this.http.get<MyEnterpriseDto>(MyEnterpriseAPI.GetMyEnterpriseInfo, {params:  query });
  }
  GetAvailableEnterpriseCode(query: GetAvailableEnterpriseCodeQuery): Observable<string[]> {
    return this.http.get<string[]>(MyEnterpriseAPI.GetAvailableEnterpriseCode, {params:  query });
  }

  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>{
    return this.http.get<boolean>(MyEnterpriseAPI.CheckAvailableEnterpriseCode, {params:  query });
  }
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseContainerDto>{
    return this.http.get<MyEnterpriseContainerDto>(MyEnterpriseAPI.GetOwned, {params:  query });
  }
  create(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.http.post<string>(MyEnterpriseAPI.Create, data, {context: showErrorDialogContext()});
  }
  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenDto>{
    return this.http.get<EnterpriseTokenDto>(MyEnterpriseAPI.GetMyEnterpriseToken, {params: query});
  }

}
