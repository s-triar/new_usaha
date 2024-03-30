import { Component, effect, signal, computed, inject, Injector, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { GetMyShopListSearchQuery, MyShopListContainerDto } from 'src/app/apis/shop-api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MyShopListService } from './data-access/my-shop-list.service';

@Component({
  selector: 'app-my-shop-list',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    NzListModule,
    NzIconModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './my-shop-list.component.html',
  styleUrl: './my-shop-list.component.scss',
  host:{
    'class':'app-page-container-top-bottom main',
    ngSkipHydration: 'true',
  },
  providers:[
    {
      provide: MyShopListService
    }
  ]
})
export class MyShopListComponent {
  private _myshoplistService: MyShopListService = inject(MyShopListService);

  dataSg = signal<MyShopListContainerDto>({
    items:[],
    pageNumber: 1,
    totalCount: 0,
    totalPages: 1
  });

  formSg = signal<GetMyShopListSearchQuery>({
    PageNumber:1,
    PageSize:20,
    Search:''
  });

  searchField = new FormControl();

  form$ = toObservable(this.formSg);
  
  constructor(
  ){
    this.searchField.valueChanges.pipe(
      takeUntilDestroyed(),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(term => {
      this.formSg.update((prev)=>prev = {...prev, Search:term})
    });  

    this.form$.pipe(
      takeUntilDestroyed(),
      switchMap(data=>this._myshoplistService.getOwnedShop(data))
    )
    .subscribe((resp)=>this.dataSg.set(resp))

  }

  changeIndexPagination(page: number): void{
    this.formSg.update((prev)=>prev = {...prev, PageNumber: page})
  }
}


