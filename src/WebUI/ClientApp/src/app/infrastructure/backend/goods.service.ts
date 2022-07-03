import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsAPI } from 'src/app/application/constant/apis';
import { showErrorDialogContext } from 'src/app/application/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/application/utility/form-conversion.service';
import { AddStockCommand, AdjustStockCommand, UpdateGoodsSellingPriceCommand } from 'src/app/domain/backend/Commands';
import { MyGoodsesListContainerDto, MyGoodsRelationDto, InfoOfGoodsForUpdatingDto } from 'src/app/domain/backend/Dtos';
import { GetMyGoodsesSearchQuery, GetMyGoodsesRelationQuery, CheckDuplicateBarcodeInAnEnterpriseQuery, GetInfoOfGoodsForUpdatingQuery } from 'src/app/domain/backend/Queries';

export interface GoodsServiceInterface{
  getMyGoodses(query: GetMyGoodsesSearchQuery): Observable<MyGoodsesListContainerDto>;
  getMyGoodsesRelation(query: GetMyGoodsesRelationQuery): Observable<MyGoodsRelationDto[]>;
  checkDuplicateBarcode(query: CheckDuplicateBarcodeInAnEnterpriseQuery): Observable<boolean>;
  create(form: any): Observable<string>;
  update(form: any): Observable<string>;
  addStock(data: AddStockCommand): Observable<string>;
  adjustStock(data: AdjustStockCommand): Observable<string>;
  changeSellPrice(data: UpdateGoodsSellingPriceCommand): Observable<string>;
  getInfoGoodsForUpdate(query: GetInfoOfGoodsForUpdatingQuery): Observable<InfoOfGoodsForUpdatingDto>;
}
@Injectable({
  providedIn: 'root'
})
export class GoodsService implements GoodsServiceInterface {

  constructor(private httpClient: HttpClient, private utilService: FormConversionService) {

  }
  getMyGoodses(query: GetMyGoodsesSearchQuery): Observable<MyGoodsesListContainerDto>{
    return this.httpClient.get<MyGoodsesListContainerDto>(GoodsAPI.GetMyGoodses, {params: query});
  }
  getMyGoodsesRelation(query: GetMyGoodsesRelationQuery): Observable<MyGoodsRelationDto[]>{
    const param = this.utilService.convertModelToHttpParams(query);
    return this.httpClient.get<MyGoodsRelationDto[]>(GoodsAPI.GetMyGoodsesRelation, {params: param});
  }
  checkDuplicateBarcode(query: CheckDuplicateBarcodeInAnEnterpriseQuery): Observable<boolean>{
    return this.httpClient.get<boolean>(GoodsAPI.CheckDuplicateBarcode, {params: query});
  }
  create(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(GoodsAPI.Create, data, {context: showErrorDialogContext()});
  }
  updateInfo(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.UpdateInfo, data, {context: showErrorDialogContext()});
  }
  addItem(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(GoodsAPI.AddItem, data, {context: showErrorDialogContext()});
  }
  update(form: any): Observable<string>{
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.Update, data, {context: showErrorDialogContext()});
  }


  addStock(data: AddStockCommand): Observable<string>{
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.AddStock, data, {context: showErrorDialogContext()});
  }
  adjustStock(data: AdjustStockCommand): Observable<string>{
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.AdjustStock, data, {context: showErrorDialogContext()});
  }
  changeSellPrice(data: UpdateGoodsSellingPriceCommand): Observable<string>{
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<string>(GoodsAPI.UpdateSellingPrice, data, {context: showErrorDialogContext()});
  }
  getInfoGoodsForUpdate(query: GetInfoOfGoodsForUpdatingQuery): Observable<InfoOfGoodsForUpdatingDto> {
    return this.httpClient.get<InfoOfGoodsForUpdatingDto>(GoodsAPI.GetInfoOfGoodsForUpdating, {params: query});
  }
}
