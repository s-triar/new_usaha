import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGroupAPI } from 'src/app/application/constant/apis';
import { showErrorDialogContext } from 'src/app/application/interceptors/notification.interceptor';
import { FormConversionService } from 'src/app/application/utility/form-conversion.service';
import { MyGoodsGroupsListContainerDto } from 'src/app/domain/backend/Dtos';
import { CheckDuplicateGoodsGroupNameQuery, GetMyGoodsGroupsSearchQuery, SearchPageRequest } from 'src/app/domain/backend/Queries';


export interface GoodsGroupServiceInterface{
  checkDuplicateBarcode(query: CheckDuplicateGoodsGroupNameQuery): Observable<boolean>;
  getMyGoodsGroup(query: GetMyGoodsGroupsSearchQuery): Observable<MyGoodsGroupsListContainerDto>;
  create(form: any): Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class GoodsGroupService implements GoodsGroupServiceInterface{

  constructor(private httpClient: HttpClient, private utilService: FormConversionService) {
  }
  checkDuplicateBarcode(query: CheckDuplicateGoodsGroupNameQuery): Observable<boolean> {
    return this.httpClient.get<boolean>(GoodsGroupAPI.CheckDuplicateGoodsGroupName, {params: query});
  }

  getMyGoodsGroup(query: SearchPageRequest): Observable<MyGoodsGroupsListContainerDto> {
    return this.httpClient.get<MyGoodsGroupsListContainerDto>(GoodsGroupAPI.GetMyGoodsGroup, {params: query});
  }
  create(form: any): Observable<string> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<string>(GoodsGroupAPI.Create, data, {context: showErrorDialogContext()});
  }
}
