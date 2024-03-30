import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, of, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


export type ProductTypeDto = {
  id: number;
  name: string;
  parentProductTypeId: number | null;
  subProductTypes: ProductTypeDto[] | null;
};

export interface ProductTypeServiceInterface {
  // getAll(): Observable<ProductTypeDto[]>;
  getAll_Tree(): Observable<ProductTypeDto[]>;
  // getRoot(): Observable<ProductTypeDto[]>;
  // getParent(idCurrent: number): Observable<ProductTypeDto[]>;
  // getChildren(idParent: number | null): Observable<ProductTypeDto[]>;
  // getItem(id: number): Observable<ProductTypeDto>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => {
    return environment.production ? new ProductTypeApiService(http) : new ProductTypeMockApiService()
  },
  deps: [HttpClient],
})
export class ProductTypeApiService implements ProductTypeServiceInterface {



  constructor(protected http: HttpClient) {

  }
  // getAll(): Observable<ProductTypeDto[]> {
  //   return this.http.get<ProductTypeDto[]>('/api/GoodsType/GetAll');
  // }

  getAll_Tree(): Observable<ProductTypeDto[]> {
    let params = new HttpParams();
    params = params.append('OnlyRoot', 'true');
    return this.http.get<ProductTypeDto[]>('/api/GoodsType/GetAll', { params });
  }
  // getRoot(): Observable<ProductTypeDto[]> {
  //   return this.getAll()
  //     .pipe(
  //       filter(x => x.length > 0),
  //       map((x) =>
  //         x.filter(
  //           (y) => y.parentProductTypeId === null || y.parentProductTypeId === 0
  //         )
  //       )
  //     );
  // }
  // getParent(idCurrent: number): Observable<ProductTypeDto[]> {
  //   return this.getAll().pipe(
  //     filter(x => x.length > 0),
  //     map((x) => x.find((y) => y.id === idCurrent)),
  //     switchMap((x) => {
  //       if (x === undefined || x.parentProductTypeId === null) {
  //         return this.getRoot();
  //       } else {
  //         return this.getAll()
  //           .pipe(map((y) => y.filter((z) => z.id === x.parentProductTypeId)));
  //       }
  //     })
  //   );
  // }
  // getChildren(idParent: number | null): Observable<ProductTypeDto[]> {
  //   return this.goodsType.asObservable().pipe(
  //     filter(x => x.length > 0),
  //     tap(x => console.log(x)),
  //     map((x) => x.find((y) => y.id == idParent)),
  //     tap(x => console.log(x)),
  //     map(x => x.subProductTypes),
  //     filter((x) => x.length > 0)
  //   );
  // }
  // getItem(id: number): Observable<ProductTypeDto> {
  //   return this.goodsType.asObservable().pipe(
  //     filter(x => x.length > 0),
  //     tap(x => console.log(x)),
  //     map((x) => x.find((y) => y.id === id)),
  //     filter(x => !!x),
  //     tap(x => console.log(x))
  //   );
  // }

  // getItemForUpdate(id: number): Observable<ProductTypeDto[]> {
  //   return this.goodsType.asObservable().pipe(
  //     filter(x => x.length > 0),
  //     tap(x => console.log(x)),
  //     map((x) => x.find((y) => y.id == id)),
  //     tap(x => console.log(x)),
  //     map(x => [x]),
  //     filter((x) => x.length > 0)
  //   );
  // }
}


@Injectable({
  providedIn: null
})
export class ProductTypeMockApiService implements ProductTypeServiceInterface {

  getAll_Tree(): Observable<ProductTypeDto[]> {
    const result: ProductTypeDto[] = [
      {
        id:1,
        name: 'Makanan',
        parentProductTypeId: null,
        subProductTypes:[
          {
            id: 11,
            name: 'Makanan Ringan',
            parentProductTypeId: 1,
            subProductTypes:null
          },
          {
            id: 12,
            name: 'Makanan Berat',
            parentProductTypeId: 1,
            subProductTypes:null
          },
        ]
      },
      {
        id:2,
        name: 'Dapur',
        parentProductTypeId: null,
        subProductTypes:[
          {
            id: 21,
            name: 'Saus',
            parentProductTypeId: 1,
            subProductTypes:null
          },
          {
            id: 22,
            name: 'Kecap',
            parentProductTypeId: 1,
            subProductTypes:null
          },
        ]
      }
    ]
    return of(result);
  }



}