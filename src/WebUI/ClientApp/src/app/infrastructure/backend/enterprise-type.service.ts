import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { EnterpriseTypeAPI } from 'src/app/core/constant/apis';

export type EnterpriseTypeDto = {
  id: number;
  name: string;
  provide: string;
};

export interface EnterpriseTypeServiceInterface{
  getAll(): Observable<EnterpriseTypeDto[]>;
  getEntepriseType(): Observable<EnterpriseTypeDto[]>;
}
@Injectable({
  providedIn: 'root',
})
export class EnterpriseTypeService implements EnterpriseTypeServiceInterface{

  private enterpriseType: BehaviorSubject<EnterpriseTypeDto[]> = new BehaviorSubject<EnterpriseTypeDto[]>([]);
  
  constructor(private httpClient: HttpClient) {
    this.getAll().subscribe((x:EnterpriseTypeDto[])=>{
      this.enterpriseType.next(x);
    });
  }

  getAll(): Observable<EnterpriseTypeDto[]>{
    return this.httpClient.get<EnterpriseTypeDto[]>(EnterpriseTypeAPI.All);
  }
  getEntepriseType(): Observable<EnterpriseTypeDto[]>{
    return this.enterpriseType.asObservable();
  }

}
