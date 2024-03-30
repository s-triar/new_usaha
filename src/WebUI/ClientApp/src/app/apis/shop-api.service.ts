import { Injectable } from '@angular/core';
import { SearchPageRequest, SearchPageResponse } from '../constants/types';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormValueToFormDataConverterService } from '../utilities/form-value-to-form-data-converter.service';
import { environment } from 'src/environments/environment';





export type CheckAvailableShopCodeQuery = {
  Code: string
};

export type GetMyShopListSearchQuery = SearchPageRequest & {

};
export type MyShopDto = {
  id: string;
  name: string;
  shopType: string;
  photo: string;
  phone: string;
  email: string;
  code: string;
  address: string;
  owned: boolean;

};
export type MyShopListContainerDto = SearchPageResponse<MyShopDto> & {

};
export type GetAvailableShopCodeQuery = {
  Name: string
};
export type GetMyShopInfoQuery = {
  Id: string;
};
export type ResultOmzetLineDiagramItem = 
{
    dateTime:Date;
    total:number;
}

export type ResultOmzetLineDiagram = 
{
    items:ResultOmzetLineDiagramItem[];
    average:number;
}
export type GetOmzetQuery={
  Year:number;
}
export interface ShopApiServiceInterface {
  getMyShopInfo(query: GetMyShopInfoQuery): Observable<MyShopDto>;
  GetOmzetMyShop(query: GetOmzetQuery):Observable<ResultOmzetLineDiagram>;
  GetAvailableShopCode(query: GetAvailableShopCodeQuery): Observable<string[]>;
  checkAvailableShopCode(query: CheckAvailableShopCodeQuery): Observable<boolean>;
  getOwned(query: GetMyShopListSearchQuery): Observable<MyShopListContainerDto>;
  create(form: any): Observable<string>;
}



@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient, formdataConverterService: FormValueToFormDataConverterService) => {
    return environment.production ? new ShopApiService(http, formdataConverterService) : new ShopApiMockService()
  },
  deps: [HttpClient, FormValueToFormDataConverterService],
})
export class ShopApiService implements ShopApiServiceInterface{

  constructor(protected http: HttpClient, private formdataConverterService: FormValueToFormDataConverterService) {
  }
  GetOmzetMyShop(query: GetOmzetQuery): Observable<ResultOmzetLineDiagram> {
    return this.http.get<ResultOmzetLineDiagram>('/api/MyShop/GetOmzetMyShop',{params:query});
  }
  getMyShopInfo(query: GetMyShopInfoQuery): Observable<MyShopDto> {
    return this.http.get<MyShopDto>('/api/MyShop/GetMyShopInfo', {params:  query });
  }
  GetAvailableShopCode(query: GetAvailableShopCodeQuery): Observable<string[]> {
    return this.http.get<string[]>('/api/Shop/GetAvailableShopCode', { params: query });
  }

  checkAvailableShopCode(query: CheckAvailableShopCodeQuery): Observable<boolean> {
    return this.http.get<boolean>('/api/Shop/CheckAvailableShopCode', { params: query });
  }
  getOwned(query: GetMyShopListSearchQuery): Observable<MyShopListContainerDto> {
    return this.http.get<MyShopListContainerDto>('/api/Shop/GetOwned', { params: query });
  }
  create(form: any): Observable<string> {
    const data = this.formdataConverterService.convertModelToFormData(form, null, null);
    return this.http.post<string>('/api/Shop/Create', data);
  }
}



@Injectable(
  {
    providedIn: null
  }
)
export class ShopApiMockService implements ShopApiServiceInterface {


  getMyShopInfo(query: GetMyShopInfoQuery): Observable<MyShopDto> {
    const data:MyShopDto = {
      address:'ini alamat',
      code:'inicode',
      email:'ini@email.com',
      id:'14118y59125y959',
      name:'ini nama',
      owned: true,
      phone:'085755519123',
      photo:'',
      shopType:'Toko'
    }
    return of(data);
  }
  GetOmzetMyShop(query: GetOmzetQuery): Observable<ResultOmzetLineDiagram> {
    throw new Error('Method not implemented.');
  }

  GetAvailableShopCode(query: GetAvailableShopCodeQuery): Observable<string[]> {
    return of([query.Name + '1', query.Name + '2', query.Name + '3'])
  }
  checkAvailableShopCode(query: CheckAvailableShopCodeQuery): Observable<boolean> {
    const m = Math.random();
    return of(m > 0.5 ? true : false)
  }
  getOwned(query: GetMyShopListSearchQuery): Observable<MyShopListContainerDto> {
    const shops: MyShopDto[] = [
      {
        address: "Jalan Wir, Desa Wirobiting RT 1 RW 1, Kecamatan Prambon, Kabupaten Sidoarjo, Jawa Timur. 61264",
        code: 'toko00',
        email: 's.triarjo@gmail.com',
        shopType: 'Toko',
        id: '7413-1419-131-3938-1310',
        name: 'Toko 00',
        owned: true,
        phone: '085755519123',
        photo: "",
      }
    ]
    for (let index = 0; index < 100; index++) {
      shops.push(shops[0])
      
    }
    const shop_retrieved = shops.filter(x => x.name.includes(query.Search) || x.code.includes(query.Search));
    const res: MyShopListContainerDto = {
      items: shop_retrieved,
      pageNumber: query.PageNumber,
      totalCount: shops.length,
      totalPages: Math.ceil(shops.length / query.PageSize)
    }
    return of(res)
  }
  create(form: any): Observable<string> {
    return of('123-456-7890-987-654');
  }

}