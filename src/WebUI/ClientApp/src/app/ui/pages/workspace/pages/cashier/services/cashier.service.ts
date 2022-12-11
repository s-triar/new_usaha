import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderAPI, MyGoodsAPI } from 'src/app/application/constant/apis';
import { showErrorDialogContext } from 'src/app/application/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/application/utility/form-conversion.service';
import { MyGoodsForCashierDto } from 'src/app/domain/backend/Dtos';
import { CashierProductSearchQuery } from 'src/app/domain/backend/Queries';
import { ApiCallService } from 'src/app/infrastructure/backend/ApiCall.service';

export interface CashierServiceInterface{
  get(query: CashierProductSearchQuery): Observable<MyGoodsForCashierDto[]>;
  pay(data: any): Observable<string>;
}
@Injectable({
  providedIn: 'root',
})
export class CashierService extends ApiCallService implements CashierServiceInterface {

  constructor(
    private httpClient: HttpClient,
    private utilService: FormConversionService
  ) {
    super(httpClient);
  }
  pay(command: any): Observable<string> {
    return this.httpClient.post<string>(OrderAPI.CreateOrderFromCashier,
      this.utilService.convertModelToFormData(command, null, null)
      , {context: showErrorDialogContext()});
  }
  get(query: CashierProductSearchQuery): Observable<MyGoodsForCashierDto[]> {
    return this.httpClient.get<MyGoodsForCashierDto[]>(MyGoodsAPI.GetListProductForCashier, {params: query});
  }
}
