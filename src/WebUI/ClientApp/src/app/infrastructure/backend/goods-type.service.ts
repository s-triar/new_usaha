import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { GoodsTypeAPI } from 'src/app/core/constant/apis';

// import { ApiCallService } from './ApiCall.service';
export type GoodsTypeDto = {
  id: number;
  name: string;
  parentGoodsTypeId: number | null;
  subGoodsTypes: GoodsTypeDto[] | null;
};

export interface GoodsTypeServiceInterface {
  getAll(): Observable<GoodsTypeDto[]>;
  getAll_Tree(): Observable<GoodsTypeDto[]>;
  getRoot(): Observable<GoodsTypeDto[]>;
  getParent(idCurrent: number): Observable<GoodsTypeDto[]>;
  getChildren(idParent: number | null): Observable<GoodsTypeDto[]>;
  getItem(id:number):Observable<GoodsTypeDto>;
}

@Injectable({
  providedIn: 'root',
})
export class GoodsTypeService implements GoodsTypeServiceInterface {
  private goodsType: BehaviorSubject<GoodsTypeDto[]> = new BehaviorSubject<
    GoodsTypeDto[]
  >([]);

  constructor(protected http: HttpClient) {
    this.getAll()
      .pipe(take(1))
      .subscribe((x) => this.goodsType.next(x));
  }
  getAll(): Observable<GoodsTypeDto[]> {
    return this.http.get<GoodsTypeDto[]>(GoodsTypeAPI.All);
  }

  getAll_Tree(): Observable<GoodsTypeDto[]> {
    let params = new HttpParams();
    params = params.append('OnlyRoot', 'true');
    return this.http.get<GoodsTypeDto[]>(GoodsTypeAPI.All, { params });
  }
  getRoot(): Observable<GoodsTypeDto[]> {
    return this.goodsType
      .asObservable()
      .pipe(
        filter(x=>x.length>0),
        map((x) =>
          x.filter(
            (y) => y.parentGoodsTypeId === null || y.parentGoodsTypeId === 0
          )
        )
      );
  }
  getParent(idCurrent: number): Observable<GoodsTypeDto[]> {
    return this.goodsType.asObservable().pipe(
      filter(x=>x.length>0),
      map((x) => x.find((y) => y.id === idCurrent)),
      switchMap((x) => {
        if (x === undefined || x.parentGoodsTypeId === null) {
          return this.getRoot();
        } else {
          return this.goodsType
            .asObservable()
            .pipe(map((y) => y.filter((z) => z.id === x.parentGoodsTypeId)));
        }
      })
    );
  }
  getChildren(idParent: number | null): Observable<GoodsTypeDto[]> {
    return this.goodsType.asObservable().pipe(
      filter(x=>x.length>0),
      tap(x=>console.log(x)),
      map((x) => x.find((y) => y.id == idParent)),
      tap(x=>console.log(x)),
      map(x=>x.subGoodsTypes),
      filter((x) => x.length > 0)
    );
  }
  getItem(id:number):Observable<GoodsTypeDto>{
    return this.goodsType.asObservable().pipe(
      filter(x=>x.length>0),
      tap(x=>console.log(x)),
      map((x) => x.find((y) => y.id === id)),
      filter(x=>!!x),
      tap(x=>console.log(x))
    );
  }

  getItemForUpdate(id:number):Observable<GoodsTypeDto[]>{
    return this.goodsType.asObservable().pipe(
      filter(x=>x.length>0),
      tap(x=>console.log(x)),
      map((x) => x.find((y) => y.id == id)),
      tap(x=>console.log(x)),
      map(x=>[x]),
      filter((x) => x.length > 0)
    );
  }
  // isExpandable(idCurrent: number | null): Observable<boolean> {
  //   return this.goodsType.asObservable().pipe(
  //     map((x) =>
  //       x.filter((y) =>
  //         idCurrent === null
  //           ? y.parentGoodsTypeId === null || y.parentGoodsTypeId === 0
  //           : y.id === idCurrent
  //       )
  //     ),
  //     map((x) =>
  //       x.every((y) => y.subGoodsTypes !== null && y.subGoodsTypes.length > 0)
  //     )
  //   );
  // }
}
