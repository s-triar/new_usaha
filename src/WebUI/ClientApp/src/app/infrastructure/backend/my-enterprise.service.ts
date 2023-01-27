import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEnterpriseAPI } from 'src/app/core/constant/apis';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/core/utility/form-conversion.service';
import { MyEnterpriseDto, MyEnterpriseContainerDto, ResultOmzetLineDiagram } from 'src/app/domain/backend/Dtos';
import { CheckAvailableEnterpriseCodeQuery, GetMyEnterprisesQuery, GetAvailableEnterpriseCodeQuery, GetMyEnterpriseInfoQuery, GetOmzetQuery } from 'src/app/domain/backend/Queries';

export interface MyEnterpriseServiceInterface{
  checkAvailableEnterpriseCode(query: CheckAvailableEnterpriseCodeQuery): Observable<boolean>;
  getOwned(query: GetMyEnterprisesQuery): Observable<MyEnterpriseContainerDto>;
  create(data: FormData): Observable<string>;
  GetAvailableEnterpriseCode(query: GetAvailableEnterpriseCodeQuery): Observable<string[]>;
  getMyEnterpriseInfo(query: GetMyEnterpriseInfoQuery): Observable<MyEnterpriseDto>;
  GetOmzetMyEnterprise(query: GetOmzetQuery):Observable<ResultOmzetLineDiagram>;
}

@Injectable({
  providedIn: 'root'
})
export class MyEnterpriseService  implements MyEnterpriseServiceInterface{

  constructor(protected http: HttpClient, private utilService: FormConversionService) {

  }
  GetOmzetMyEnterprise(query: GetOmzetQuery): Observable<ResultOmzetLineDiagram> {
    return this.http.get<ResultOmzetLineDiagram>(MyEnterpriseAPI.GetOmzetMyEnterprise,{params:query});
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
    return this.http.post<string>(MyEnterpriseAPI.Create, data, {context: setErrorDialogContext()});
  }


}
