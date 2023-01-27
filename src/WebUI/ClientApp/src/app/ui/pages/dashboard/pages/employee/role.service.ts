import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleAPI } from 'src/app/core/constant/apis';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/core/utility/form-conversion.service';
import { CreateRoleCommand, UpdateRoleCommand, DeleteRoleCommand } from 'src/app/domain/backend/Commands';
import { EnterpriseClaimDto, EnterpriseRoleDetailDto, EnterpriseRoleContainerDto, EnterpriseRoleDto } from 'src/app/domain/backend/Dtos';
import { CheckDuplicateRoleNameQuery, GetEnterpriseRoleClaimsQuery, GetEnterpriseRoleQuery, GetEnterpriseRoleListQuery } from 'src/app/domain/backend/Queries';


export interface RoleServiceInterface{
  getEnterpriseClaims(): Observable<EnterpriseClaimDto[]>;
  checkDuplicateRoleName(query: CheckDuplicateRoleNameQuery): Observable<boolean>;
  createEnterpriseRole(form: CreateRoleCommand): Observable<string>;
  updateEnterpriseRole(form: UpdateRoleCommand): Observable<string>;
  deleteEnterpriseRole(form: DeleteRoleCommand): Observable<string>;
  getEnterpriseRoleClaims(query: GetEnterpriseRoleClaimsQuery): Observable<EnterpriseRoleDetailDto>;
  getEnterpriseRolePage(query: GetEnterpriseRoleQuery): Observable<EnterpriseRoleContainerDto>;
  getEnterpriseRoleList(query: GetEnterpriseRoleListQuery): Observable<EnterpriseRoleDto[]>;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService  implements RoleServiceInterface{

  constructor(private httpClient: HttpClient, private utilService: FormConversionService) {
  }
  getEnterpriseRolePage(query: GetEnterpriseRoleQuery): Observable<EnterpriseRoleContainerDto> {
    return this.httpClient.get<EnterpriseRoleContainerDto>
                (RoleAPI.GetEnterpriseRolePage, {params: this.utilService.convertModelToHttpParams(query)});
  }
  getEnterpriseRoleClaims(query: GetEnterpriseRoleClaimsQuery): Observable<EnterpriseRoleDetailDto> {
    return this.httpClient.get<EnterpriseRoleDetailDto>
                (RoleAPI.GetEnterpriseRoleClaim, {params: this.utilService.convertModelToHttpParams(query)});
  }
  createEnterpriseRole(form: CreateRoleCommand): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(RoleAPI.CreateEnterpriseRole, data, {context: setErrorDialogContext()});
  }
  updateEnterpriseRole(form: UpdateRoleCommand): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(RoleAPI.UpdateEnterpriseRole, data, {context: setErrorDialogContext()});
  }
  deleteEnterpriseRole(form: DeleteRoleCommand): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    console.log(data);
    return this.httpClient.put<string>(RoleAPI.DeleteEnterpriseRole, data, {context: setErrorDialogContext()});
  }

  checkDuplicateRoleName(query: CheckDuplicateRoleNameQuery): Observable<boolean> {
    return this.httpClient.get<boolean>
                (RoleAPI.CheckDuplicateRoleName, {params: this.utilService.convertModelToHttpParams(query)});
  }
  getEnterpriseClaims(): Observable<EnterpriseClaimDto[]>{
    return this.httpClient.get<EnterpriseClaimDto[]>
                (RoleAPI.GetEnterpriseClaim);
  }
  getEnterpriseRoleList(query: GetEnterpriseRoleListQuery): Observable<EnterpriseRoleDto[]>{
    return this.httpClient.get<EnterpriseRoleDto[]>
          (RoleAPI.GetEnterpriseRoleList, {params: this.utilService.convertModelToHttpParams(query)});
  }


}
