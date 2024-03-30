import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


export type ShopTypeDto = {
  id: number;
  name: string;
  provide: string;
};



export interface ShopTypeServiceInterface{
  getAll(): Observable<ShopTypeDto[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => {
    return environment.production ? new ShopTypeApiService(http) : new ShopTypeApiMockService()
  },
  deps: [HttpClient],
})
export class ShopTypeApiService implements ShopTypeServiceInterface{

  
  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<ShopTypeDto[]>{
    return this.httpClient.get<ShopTypeDto[]>('/api/ShopType/GetAll');
  }

}

@Injectable({providedIn:null})
export class ShopTypeApiMockService implements ShopTypeServiceInterface{
  getAll(): Observable<ShopTypeDto[]> {
    return of([
      {
        id: 1,
        name: 'Toko',
        provide: 'Keperluan sehari-hari'
      },
      {
        id: 2,
        name: 'Apotek',
        provide: 'Obat-obatan'
      },
      {
        id: 3,
        name: 'Warung',
        provide: 'Makanan dan minuman'
      }
    ])
  }

}