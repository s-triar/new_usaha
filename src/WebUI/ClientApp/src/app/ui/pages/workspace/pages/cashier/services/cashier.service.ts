import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderAPI, MyGoodsAPI } from 'src/app/core/constant/apis';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/core/utility/form-conversion.service';
import { MyGoodsForCashierDto } from 'src/app/domain/backend/Dtos';
import { CashierProductSearchQuery } from 'src/app/domain/backend/Queries';


export interface CashierServiceInterface{
  get(query: CashierProductSearchQuery): Observable<MyGoodsForCashierDto[]>;
  pay(data: any): Observable<string>;
}
@Injectable({
  providedIn: 'root',
})
export class CashierService implements CashierServiceInterface {

  constructor(
    private httpClient: HttpClient,
    private utilService: FormConversionService
  ) {

  }
  pay(command: any): Observable<string> {
    return this.httpClient.post<string>(OrderAPI.CreateOrderFromCashier,
      this.utilService.convertModelToFormData(command, null, null)
      , {context: setErrorDialogContext()});
  }
  get(query: CashierProductSearchQuery): Observable<MyGoodsForCashierDto[]> {
    return this.httpClient.get<MyGoodsForCashierDto[]>(MyGoodsAPI.GetListProductForCashier, {params: query});
  }
}
