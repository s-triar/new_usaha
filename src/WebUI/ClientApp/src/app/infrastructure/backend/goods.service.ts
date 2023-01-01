import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyGoodsAPI } from 'src/app/application/constant/apis';
import { showErrorDialogContext } from 'src/app/application/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/application/utility/form-conversion.service';
import {
  AddStockCommand,
  AdjustStockCommand,
  UpdateGoodsSellingPriceCommand,
} from 'src/app/domain/backend/Commands';
import {
  MyGoodsesListContainerDto,
  MyGoodsRelationDto,
  InfoOfGoodsForUpdatingDto,
  ResultWithMessage,
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

export interface GoodsServiceInterface {
  getMyGoodses(
    query: GetMyGoodsesSearchQuery
  ): Observable<MyGoodsesListContainerDto>;
  getMyGoodsesRelation(
    query: GetMyGoodsesRelationQuery
  ): Observable<MyGoodsRelationDto[]>;
  checkDuplicateBarcode(
    query: CheckDuplicateBarcodeInAnEnterpriseQuery
  ): Observable<boolean>;
  create(form: any): Observable<ResultWithMessage>;
  update(form: any): Observable<ResultWithMessage>;
  addStock(data: AddStockCommand): Observable<ResultWithMessage>;
  adjustStock(data: AdjustStockCommand): Observable<ResultWithMessage>;
  changeSellPrice(
    data: UpdateGoodsSellingPriceCommand
  ): Observable<ResultWithMessage>;
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
export class GoodsService implements GoodsServiceInterface {
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
  create(form: any): Observable<ResultWithMessage> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<ResultWithMessage>(MyGoodsAPI.Create, data, {
      context: showErrorDialogContext(),
    });
  }
  updateInfo(form: any): Observable<ResultWithMessage> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<ResultWithMessage>(MyGoodsAPI.UpdateInfo, data, {
      context: showErrorDialogContext(),
    });
  }
  addItem(form: any): Observable<ResultWithMessage> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<ResultWithMessage>(MyGoodsAPI.AddItem, data, {
      context: showErrorDialogContext(),
    });
  }
  update(form: any): Observable<ResultWithMessage> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<ResultWithMessage>(MyGoodsAPI.Update, data, {
      context: showErrorDialogContext(),
    });
  }

  addStock(data: AddStockCommand): Observable<ResultWithMessage> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<ResultWithMessage>(MyGoodsAPI.AddStock, data, {
      context: showErrorDialogContext(),
    });
  }
  adjustStock(data: AdjustStockCommand): Observable<ResultWithMessage> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<ResultWithMessage>(
      MyGoodsAPI.AdjustStock,
      data,
      { context: showErrorDialogContext() }
    );
  }
  changeSellPrice(
    data: UpdateGoodsSellingPriceCommand
  ): Observable<ResultWithMessage> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<ResultWithMessage>(
      MyGoodsAPI.UpdateSellingPrice,
      data,
      { context: showErrorDialogContext() }
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
