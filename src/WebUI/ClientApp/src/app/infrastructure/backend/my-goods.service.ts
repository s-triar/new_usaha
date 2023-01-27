import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyGoodsAPI } from 'src/app/core/constant/apis';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/core/utility/form-conversion.service';
import {
  AddStockCommand,
  AdjustStockCommand,
  UpdateGoodsSellingPriceCommand,
} from 'src/app/domain/backend/Commands';
import {
  MyGoodsesListContainerDto,
  MyGoodsRelationDto,
  InfoOfGoodsForUpdatingDto,
  ResultSellPriceLineDiagram,
  ResultBuyPriceLineDiagram,
  ResultSoldLineDiagram,
} from 'src/app/domain/backend/Dtos';
import {
  GetMyGoodsesSearchQuery,
  GetMyGoodsesRelationQuery,
  CheckDuplicateBarcodeInAnEnterpriseQuery,
  GetInfoOfGoodsForUpdatingQuery,
  SellPriceChangeInARangeQuery,
  BuyPriceChangeInARangeQuery,
  NumberSoldInARangeQuery,
} from 'src/app/domain/backend/Queries';

export interface MyGoodsServiceInterface {
  getMyGoodses(
    query: GetMyGoodsesSearchQuery
  ): Observable<MyGoodsesListContainerDto>;
  getMyGoodsesRelation(
    query: GetMyGoodsesRelationQuery
  ): Observable<MyGoodsRelationDto[]>;
  checkDuplicateBarcode(
    query: CheckDuplicateBarcodeInAnEnterpriseQuery
  ): Observable<boolean>;
  create(form: any): Observable<void>;
  update(form: any): Observable<void>;
  addStock(data: AddStockCommand): Observable<void>;
  adjustStock(data: AdjustStockCommand): Observable<void>;
  changeSellPrice(
    data: UpdateGoodsSellingPriceCommand
  ): Observable<void>;
  getInfoGoodsForUpdate(
    query: GetInfoOfGoodsForUpdatingQuery
  ): Observable<InfoOfGoodsForUpdatingDto>;

  getListProductSellPrice(
    query: SellPriceChangeInARangeQuery
  ): Observable<ResultSellPriceLineDiagram>;
  getListProductBuyPrice(
    query: BuyPriceChangeInARangeQuery
  ): Observable<ResultBuyPriceLineDiagram>;
  getListProductNSold(
    query: NumberSoldInARangeQuery
  ): Observable<ResultSoldLineDiagram>;
}
@Injectable({
  providedIn: 'root',
})
export class MyGoodsService implements MyGoodsServiceInterface {
  constructor(
    private httpClient: HttpClient,
    private utilService: FormConversionService
  ) {}
  getMyGoodses(
    query: GetMyGoodsesSearchQuery
  ): Observable<MyGoodsesListContainerDto> {
    return this.httpClient.get<MyGoodsesListContainerDto>(
      MyGoodsAPI.GetMyGoodses,
      { params: query }
    );
  }
  getMyGoodsesRelation(
    query: GetMyGoodsesRelationQuery
  ): Observable<MyGoodsRelationDto[]> {
    const param = this.utilService.convertModelToHttpParams(query);
    return this.httpClient.get<MyGoodsRelationDto[]>(
      MyGoodsAPI.GetMyGoodsesRelation,
      { params: param }
    );
  }
  checkDuplicateBarcode(
    query: CheckDuplicateBarcodeInAnEnterpriseQuery
  ): Observable<boolean> {
    return this.httpClient.get<boolean>(MyGoodsAPI.CheckDuplicateBarcode, {
      params: query,
    });
  }
  create(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<void>(MyGoodsAPI.Create, data, {
      context: setErrorDialogContext(),
    });
  }
  updateInfo(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>(MyGoodsAPI.UpdateInfo, data, {
      context: setErrorDialogContext(),
    });
  }
  addItem(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<void>(MyGoodsAPI.AddItem, data, {
      context: setErrorDialogContext(),
    });
  }
  update(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>(MyGoodsAPI.Update, data, {
      context: setErrorDialogContext(),
    });
  }

  addStock(data: AddStockCommand): Observable<void> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>(MyGoodsAPI.AddStock, data, {
      context: setErrorDialogContext(),
    });
  }
  adjustStock(data: AdjustStockCommand): Observable<void> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>(
      MyGoodsAPI.AdjustStock,
      data,
      { context: setErrorDialogContext() }
    );
  }
  changeSellPrice(
    data: UpdateGoodsSellingPriceCommand
  ): Observable<void> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>(
      MyGoodsAPI.UpdateSellingPrice,
      data,
      { context: setErrorDialogContext() }
    );
  }
  getInfoGoodsForUpdate(
    query: GetInfoOfGoodsForUpdatingQuery
  ): Observable<InfoOfGoodsForUpdatingDto> {
    return this.httpClient.get<InfoOfGoodsForUpdatingDto>(
      MyGoodsAPI.GetInfoOfGoodsForUpdating,
      { params: query }
    );
  }

  getListProductSellPrice(
    query: SellPriceChangeInARangeQuery
  ): Observable<ResultSellPriceLineDiagram> {
    return this.httpClient.get<ResultSellPriceLineDiagram>(
      MyGoodsAPI.GetListProductSellPrice,
      { params: query }
    );
  }
  getListProductBuyPrice(
    query: BuyPriceChangeInARangeQuery
  ): Observable<ResultBuyPriceLineDiagram> {
    return this.httpClient.get<ResultBuyPriceLineDiagram>(
      MyGoodsAPI.GetListProductBuyPrice,
      { params: query }
    );
  }
  getListProductNSold(
    query: NumberSoldInARangeQuery
  ): Observable<ResultSoldLineDiagram> {
    return this.httpClient.get<ResultSoldLineDiagram>(
      MyGoodsAPI.GetListProductNSold,
      { params: query }
    );
  }
}
