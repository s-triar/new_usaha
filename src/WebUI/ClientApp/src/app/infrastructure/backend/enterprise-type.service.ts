import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnterpriseTypeAPI } from 'src/app/application/constant/apis';
import { EnterpriseTypeDto } from 'src/app/domain/backend/Dtos';

export interface EnterpriseTypeServiceInterface{
  getAll(): Observable<EnterpriseTypeDto[]>;
}
@Injectable({
  providedIn: 'root',
})
export class EnterpriseTypeService implements EnterpriseTypeServiceInterface{

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<EnterpriseTypeDto[]>{
    return this.httpClient.get<EnterpriseTypeDto[]>(EnterpriseTypeAPI.All);
  }

}
