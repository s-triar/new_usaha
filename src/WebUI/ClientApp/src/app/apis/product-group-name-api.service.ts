import { Injectable } from '@angular/core';
import { SearchPageRequest, SearchPageResponse } from '../constants/types';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



export type CreateProductGroupCommand = {
  Name: string;
  Description: string|null;
};

export type GetMyProductGroupsSearchQuery = SearchPageRequest & {

};
export type CheckDuplicateProductGroupNameQuery = {
    Name: string;
};

export type MyProductGroupListMemberItemDto = {
  id: string;
  name: string;
  photoUrl: string|null;
};

export type MyProductGroupsListItemDto = {
  id: string;
  name: string;
  members: MyProductGroupListMemberItemDto[];
};


export type MyProductGroupsListContainerDto = SearchPageResponse<MyProductGroupsListItemDto> & {

};

export interface ProductGroupNameApiServiceInterface{
  checkDuplicateBarcode(query: CheckDuplicateProductGroupNameQuery): Observable<boolean>;
  getMyProductGroup(query: GetMyProductGroupsSearchQuery): Observable<MyProductGroupsListContainerDto>;
  create(form: CreateProductGroupCommand): Observable<string>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => {
    return environment.production ? new ProductGroupNameApiService(http) : new ProductGroupNameMockApiService()
  },
  deps: [HttpClient],
})
export class ProductGroupNameApiService implements ProductGroupNameApiServiceInterface{

  constructor(private httpClient: HttpClient) {
  }
  checkDuplicateBarcode(query: CheckDuplicateProductGroupNameQuery): Observable<boolean> {
    return this.httpClient.get<boolean>('/api/ProductGroup/CheckDuplicateProductGroupName', {params: query});
  }
  getMyProductGroup(query: SearchPageRequest): Observable<MyProductGroupsListContainerDto> {
    return this.httpClient.get<MyProductGroupsListContainerDto>('/api/ProductGroup/GetMyProductGroups', {params: query});
  }
  create(form: CreateProductGroupCommand): Observable<string> {
    return this.httpClient.post<string>('/api/ProductGroup/Create', form);
  }
}

@Injectable({
  providedIn: null
})
export class ProductGroupNameMockApiService implements ProductGroupNameApiServiceInterface {


  checkDuplicateBarcode(query: CheckDuplicateProductGroupNameQuery): Observable<boolean> {
    const m = Math.random();
    return of(m > 0.5 ? true : false)
  }
  getMyProductGroup(query: SearchPageRequest): Observable<MyProductGroupsListContainerDto> {
    const container: MyProductGroupsListContainerDto = {
      items:[
        {
          id: '1',
          members: [
            {
              id:'id-product-`1',
              name:'soklin detergen merah',
              photoUrl: null,
            }
          ],
          name: 'soklin detergen',
        }
      ],
      pageNumber: 1,
      totalCount: 10,
      totalPages: 33,
    }
    return of(container);
  }
  create(form: CreateProductGroupCommand): Observable<string> {
    return of('ini-id-group-name');
  }
}