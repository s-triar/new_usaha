import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeeAPI } from 'src/app/core/constant/apis';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/core/utility/form-conversion.service';
import { EnterpriseEmployeeListContainerDto, EnterpriseEmployeeDetailDto, UserMinimalInfo } from 'src/app/domain/backend/Dtos';
import { CheckAvailableCandidateEmployeeQuery, GetCandidateEmployeeQuery, GetDetailEnterpriseEmployeeQuery, GetEnterpriseEmployeeQuery } from 'src/app/domain/backend/Queries';



export interface EmployeeServiceInterface{
  checkAvailabilityCandidateEmployee(query: CheckAvailableCandidateEmployeeQuery): Observable<boolean>;
  getEnterpriseEmployee(query: GetEnterpriseEmployeeQuery): Observable<EnterpriseEmployeeListContainerDto>;
  getDetailEnterpriseEmployee(query: GetDetailEnterpriseEmployeeQuery): Observable<EnterpriseEmployeeDetailDto>;
  getCandidateEmployee(query:GetCandidateEmployeeQuery):Observable<UserMinimalInfo>;
  createEmployee(form:any):Observable<string>;
  updateEmployee(form:any):Observable<string>;
  deleteEmployee(form:any):Observable<string>;
  joinEmployee(form:any):Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements EmployeeServiceInterface {

  constructor(private httpClient: HttpClient, private utilService: FormConversionService) {

  }
  createEmployee(form: any): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(EmployeeAPI.CreateEmployee, data, {context: setErrorDialogContext()});
  }
  updateEmployee(form: any): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(EmployeeAPI.UpdateEmployee, data, {context: setErrorDialogContext()});
  }
  deleteEmployee(form: any): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(EmployeeAPI.DeleteEmployee, data, {context: setErrorDialogContext()});
  }
  getDetailEnterpriseEmployee(query: GetDetailEnterpriseEmployeeQuery): Observable<EnterpriseEmployeeDetailDto> {
    return this.httpClient.get<EnterpriseEmployeeDetailDto>(EmployeeAPI.GetDetailEnterpriseEmployee, {params: query});
  }
  getCandidateEmployee(query: GetCandidateEmployeeQuery): Observable<UserMinimalInfo> {
    return this.httpClient.get<UserMinimalInfo>(EmployeeAPI.GetCandidateEmployee,{params: query});
  }
  checkAvailabilityCandidateEmployee(query: CheckAvailableCandidateEmployeeQuery): Observable<boolean>{
    return this.httpClient.get<boolean>(EmployeeAPI.CheckAvailableCandidateEmployee, {params: query});
  }
  getEnterpriseEmployee(query: GetEnterpriseEmployeeQuery): Observable<EnterpriseEmployeeListContainerDto>{
    return this.httpClient.get<EnterpriseEmployeeListContainerDto>
                (EmployeeAPI.GetEnterpriseEmployeeList, {params: this.utilService.convertModelToHttpParams(query)});
  }
  joinEmployee(form: any): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(EmployeeAPI.JoinEmployee, data, {context: setErrorDialogContext()});
  }

}
