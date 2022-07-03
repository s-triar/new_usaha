import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnterpriseAPI } from 'src/app/application/constant/apis';
import { showErrorDialogContext } from 'src/app/application/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/application/utility/form-conversion.service';
import { MyEnterpriseDto, EnterpriseTokenDto } from 'src/app/domain/backend/Dtos';
import { CheckAvailableEnterpriseCodeQuery, GetMyEnterprisesQuery, GetAvailableEnterpriseCodeQuery, EnterpriseTokenQuery, GetMyEnterpriseInfoQuery } from 'src/app/domain/backend/Queries';

export interface EnterpriseServiceInterface{
  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>;
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseDto[]>;
  create(data: FormData): Observable<string>;
  GetAvailableEnterpriseCode(query: GetAvailableEnterpriseCodeQuery): Observable<string[]>;
  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenDto>;
  getMyEnterpriseInfo(query: GetMyEnterpriseInfoQuery): Observable<MyEnterpriseDto>;
}

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService  implements EnterpriseServiceInterface{

  constructor(protected http: HttpClient, private utilService: FormConversionService) {

  }
  getMyEnterpriseInfo(query: GetMyEnterpriseInfoQuery): Observable<MyEnterpriseDto> {
    return this.http.get<MyEnterpriseDto>(EnterpriseAPI.GetMyEnterpriseInfo, {params:  query });
  }
  GetAvailableEnterpriseCode(query: GetAvailableEnterpriseCodeQuery): Observable<string[]> {
    return this.http.get<string[]>(EnterpriseAPI.GetAvailableEnterpriseCode, {params:  query });
  }

  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>{
    return this.http.get<boolean>(EnterpriseAPI.CheckAvailableEnterpriseCode, {params:  query });
  }
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseDto[]>{
    return this.http.get<MyEnterpriseDto[]>(EnterpriseAPI.GetOwned, {params:  query });
  }
  create(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.http.post<string>(EnterpriseAPI.Create, data, {context: showErrorDialogContext()});
  }
  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenDto>{
    return this.http.get<EnterpriseTokenDto>(EnterpriseAPI.GetEnterpriseToken, {params: query});
  }

}
