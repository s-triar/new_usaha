import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGroupAPI } from 'src/app/core/constant/apis';
import { setErrorDialogContext } from 'src/app/core/interceptors/notification.interceptor';
import { MyGoodsGroupsListContainerDto } from 'src/app/domain/backend/Dtos';
import { CheckDuplicateGoodsGroupNameQuery, GetMyGoodsGroupsSearchQuery, SearchPageRequest } from 'src/app/domain/backend/Queries';


export type CreateGoodsGroupCommand = {
  Name: string;
  Description: string|null;
};

export interface MyGoodsGroupServiceInterface{
  checkDuplicateBarcode(query: CheckDuplicateGoodsGroupNameQuery): Observable<boolean>;
  getMyGoodsGroup(query: GetMyGoodsGroupsSearchQuery): Observable<MyGoodsGroupsListContainerDto>;
  create(form: CreateGoodsGroupCommand): Observable<string>;
}

@Injectable()
export class MyGoodsGroupService implements MyGoodsGroupServiceInterface{

  constructor(private httpClient: HttpClient) {
  }
  checkDuplicateBarcode(query: CheckDuplicateGoodsGroupNameQuery): Observable<boolean> {
    return this.httpClient.get<boolean>(GoodsGroupAPI.CheckDuplicateGoodsGroupName, {params: query});
  }
  getMyGoodsGroup(query: SearchPageRequest): Observable<MyGoodsGroupsListContainerDto> {
    return this.httpClient.get<MyGoodsGroupsListContainerDto>(GoodsGroupAPI.GetMyGoodsGroup, {params: query});
  }
  create(form: CreateGoodsGroupCommand): Observable<string> {
    return this.httpClient.post<string>(GoodsGroupAPI.Create, form, {context: setErrorDialogContext()});
  }
}
