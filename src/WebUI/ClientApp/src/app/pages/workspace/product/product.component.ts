import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MyShopListService } from '../../main/my-shop-list/data-access/my-shop-list.service';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MyShopListContainerDto, GetMyShopListSearchQuery } from 'src/app/apis/shop-api.service';
@Component({
  selector: 'app-product-ws',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    NzIconModule,
    NzListModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  host:{
    'class':'app-page-container-top',
    ngSkipHydration: 'true',
  },
  providers:[
    {
      provide: MyShopListService
    }
  ]
})
export class ProductComponent {
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
