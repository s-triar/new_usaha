import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyEnterpriseAPI } from '../constant/apis';


export type EnterpriseTokenQuery = {
  EnterpriseId: string;
};

export type EnterpriseTokenResponseDto=
{
    token:string;
}

export interface EnterpriseAuthServiceInterface{
  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenResponseDto>;
}


@Injectable({
  providedIn: 'root'
})

export class EnterpriseAuthService implements EnterpriseAuthServiceInterface{

  constructor(private http:HttpClient) { }

  getEnterpriseToken(query: EnterpriseTokenQuery): Observable<EnterpriseTokenResponseDto> {
    return this.http.get<EnterpriseTokenResponseDto>(MyEnterpriseAPI.GetMyEnterpriseToken, {params: query});
  }


}
