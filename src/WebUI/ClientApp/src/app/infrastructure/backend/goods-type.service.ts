import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap} from 'rxjs';
import { GoodsTypeAPI } from 'src/app/application/constant/apis';
import { GoodsTypeDto } from 'src/app/domain/backend/Dtos';
import { ApiCallService } from './ApiCall.service';


export interface GoodsTypeServiceInterface{
  getAll(): Observable<GoodsTypeDto[]>;
  getAll_Tree(): Observable<GoodsTypeDto[]>;
}

@Injectable({
  providedIn: 'root',
})
export class GoodsTypeService implements GoodsTypeServiceInterface{
  GoodsTypes$: BehaviorSubject<GoodsTypeDto[]> = new BehaviorSubject<GoodsTypeDto[]>([]);
  constructor(protected http: HttpClient) {
    // this.GoodsTypes$ = this.getAll();
    this.getAll().pipe(tap(x=>console.log(x))).subscribe(x => this.GoodsTypes$.next(x));
  }
  getAll(): Observable<GoodsTypeDto[]> {
    return this.http.get<GoodsTypeDto[]>(GoodsTypeAPI.All);
  }

  getAll_Tree(): Observable<GoodsTypeDto[]>{
    let params = new HttpParams();
    params = params.append('OnlyRoot', 'true');
    return this.http.get<GoodsTypeDto[]>(GoodsTypeAPI.All, {params});
  }

  getChildren(idParent:number|null):Observable<GoodsTypeDto[]>{
    return this.GoodsTypes$.asObservable().pipe(map(x=>x.filter(y=>y.parentGoodsTypeId==idParent)));
  }
  isExpandable(idCurrent: number): Observable<boolean> {
    return this.GoodsTypes$.asObservable().pipe(map(x=>x.filter(y=>y.id===idCurrent)),map(x=>x.every(y=>y.subGoodsTypes.length>0)));

  }
}



