import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAPI } from 'src/app/application/constant/apis';
import { FormConversionService } from 'src/app/application/utility/form-conversion.service';
import { TransactionListContainerDto, DetailOrderDto } from 'src/app/domain/backend/Dtos';
import { GetOrderEnterpriseQuery, GetDetailOrderEnterpriseQuery } from 'src/app/domain/backend/Queries';

export interface TransactionServiceInterface{
  getEnterpriseTransaction(query: GetOrderEnterpriseQuery): Observable<TransactionListContainerDto>;
  getDetailEnterpriseTransaction(query: GetDetailOrderEnterpriseQuery): Observable<DetailOrderDto>;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService implements TransactionServiceInterface {

  constructor(private httpClient: HttpClient, private utilService: FormConversionService) {

  }

  getEnterpriseTransaction(query: GetOrderEnterpriseQuery): Observable<TransactionListContainerDto>{
    return this.httpClient.get<TransactionListContainerDto>
                (OrderAPI.EnterpriseTrasaction, {params: this.utilService.convertModelToHttpParams(query)});
  }

  getDetailEnterpriseTransaction(query: GetDetailOrderEnterpriseQuery): Observable<DetailOrderDto>{
    return this.httpClient.get<DetailOrderDto>
                (OrderAPI.DetailEnterpriseTransaction, {params: this.utilService.convertModelToHttpParams(query)});
  }
}
