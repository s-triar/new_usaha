import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyGoodsAPI, OrderAPI } from 'src/app/core/constant/apis';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/core/utility/form-conversion.service';

export type WholesalespriceDto={
  wholesalerPrice: number;
  wholesalerMin: number;
  id: string;

}
export type CashierProductSearchQuery = {
  Search: string;
  EnterpriseId: string;
};
export type MyGoodsForCashierDto = {
  id: string;
  enterpriseId: string;
  barcode: string;
  name: string;
  price: number;
  wholessalePrices:WholesalespriceDto[];
  promos: any[];
  isWholesalerPriceAuto: boolean;
  goodsPackaging: string;
};

export type PosCashierPaymentResponseDto ={
  id: string;
}
export interface PosCashierServiceInterface{
  get(query: CashierProductSearchQuery): Observable<MyGoodsForCashierDto[]>;
  pay(data: any): Observable<PosCashierPaymentResponseDto>;
}

@Injectable({
  providedIn: 'root'
})
export class PosCashierApiService implements PosCashierServiceInterface{

  constructor(
    private httpClient: HttpClient,
    private utilService: FormConversionService
  ) {

  }
  pay(command: any): Observable<PosCashierPaymentResponseDto> {
    // const headers = new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded'
    //   });
      console.log(command);
      const fd = this.utilService.convertModelToFormData(command, null, null);
      console.log(fd);
    return this.httpClient.post<PosCashierPaymentResponseDto>(OrderAPI.CreateOrderFromCashier,
      fd
      , {context: setErrorDialogContext()});
  }
  get(query: CashierProductSearchQuery): Observable<MyGoodsForCashierDto[]> {
    return this.httpClient.get<MyGoodsForCashierDto[]>(MyGoodsAPI.GetListProductForCashier, {params: query});
  }
}
