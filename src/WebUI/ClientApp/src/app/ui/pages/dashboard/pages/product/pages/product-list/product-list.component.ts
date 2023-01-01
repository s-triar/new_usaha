import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { WORKSPACE_ROUTE, WS_PRODUCT, GLOBAL_PATH, DASHBOARD_ROUTE, DSHB_PRODUCT } from 'src/app/application/constant/routes';
import { MyGoodsesListItemDto, MyGoodsesListContainerDto } from 'src/app/domain/backend/Dtos';
import { GoodsService } from 'src/app/infrastructure/backend/goods.service';
import { currentPageDescription, PageNumberChangedEvent, PageSizeChangedEvent, PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { MyProductListItemComponent } from '../../components/my-product-list-item/my-product-list-item.component';



@UntilDestroy()
@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    ReactiveFormsModule,
    SearchInputBarcodeComponent,
    MatButtonModule,
    MatListModule,
    PaginationComponent,
    MyProductListItemComponent,
    RouterModule,
    // FontAwesomeModule
    MatIconModule
  ]
})
export class ProductListComponent implements OnInit {
  icons = {
    add: 'add'
  };
  @ViewChild(PaginationComponent, {static: true}) pagination!: PaginationComponent;

  private listProductContainer!: ElementRef;

 @ViewChild('listProductContainer', {static: false, read: ElementRef}) set content(content: ElementRef) {
    if (content) {
        this.listProductContainer = content as ElementRef;
    }
 }
  idUsaha!: string;
  PARAM_DASHBOARD_ID_USAHA = DASHBOARD_ROUTE._ID_USAHA;
  PARAM_PRODUCT_ID_PRODUCT_INFO = DSHB_PRODUCT._ID_PRODUCT_INFO;
  linkToAddBluePrint = GLOBAL_PATH.DASHBOARD_PRODUCT_ADD;
  linkToInfoBluePrint = GLOBAL_PATH.DASHBOARD_PRODUCT_INFO;
  linkToAdd!: string;
  info1!: string;
  info2!: string;

  formSearch = this.formBuilder.group({
    Search: this.formBuilder.nonNullable.control(''),
    PageSize: this.formBuilder.nonNullable.control(20),
    PageNumber: this.formBuilder.nonNullable.control(1)
  });
  productList: MyGoodsesListItemDto[] = [];
  productInfoLinks: string[] = [];
  pages: number[] = [1];
  currentPage: currentPageDescription = {
    isCurrentPageStartPage: true,
    isCurrentPageLastPage: true
  };
  constructor(
    private routes: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    // private wsStateService: WorkspaceStateService,
    private myGoodsService: GoodsService
  ) {
    this.routes.parent?.parent?.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.idUsaha = params[this.PARAM_DASHBOARD_ID_USAHA.substring(1)];
      const addSplit = this.linkToAddBluePrint.split(this.PARAM_DASHBOARD_ID_USAHA);
      this.linkToAdd = addSplit[0] + this.idUsaha + addSplit[1];
      console.log(params);
      console.log(this.idUsaha, this.linkToAdd);
    });
   }

   linkToInfo(id: string): string{
    const split1 = this.linkToInfoBluePrint.split(this.PARAM_DASHBOARD_ID_USAHA);
    const split2 = split1[1].split(this.PARAM_PRODUCT_ID_PRODUCT_INFO);
    return split1[0] + this.idUsaha + split2[0] + id + split2[1];
   }

  ngOnInit(): void {
    // this.wsStateService.changeViewState({
    //   isFooterBarNeedToBeShown: true,
    //   isSearchBarNeedToBeShown: true,
    //   isTabBarNeedToBeShown: true
    // });
    this.searchProduct();
    this.setPaginationConfig();
    this.formSearch.controls.Search.setValue('', {onlySelf: true});
    this.formSearch.controls.Search.updateValueAndValidity();

  }
  goto(link: string): void{
    this.router.navigateByUrl(link);
  }
  setPaginationConfig(): void{
    this.pagination.setPageSize(this.formSearch.controls.PageSize.value);
    this.pagination.setPagesNumbers(this.formSearch.controls.PageNumber.value);
  }

  searchProduct(): void{
    this.formSearch.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(x => this.callSearchProductApi())
    )
    .subscribe(x => {
      this.mappingDtoToVar(x);
      this.pagination.setPagesNumbers(x.totalPages);
    });
  }

  mappingDtoToVar(x: MyGoodsesListContainerDto): void{
    this.productList = x.items;
    this.productInfoLinks = [];
    for (const item of x.items) {
      this.productInfoLinks.push(this.linkToInfo(item.id));
    }
    this.pages = [];
    for (let i = 0; i < x.totalPages; i++){
      this.pages.push(i + 1);
    }
    if (this.listProductContainer && this.listProductContainer.nativeElement){
      this.listProductContainer.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  callSearchProductApi(): Observable<MyGoodsesListContainerDto>{
    return this.myGoodsService.getMyGoodses({
      Search: this.formSearch.controls.Search.value,
      PageNumber: this.formSearch.controls.PageNumber.value,
      PageSize: this.formSearch.controls.PageSize.value
    });
  }
  paginationNChanged(event: PageSizeChangedEvent): void{
    this.formSearch.controls.PageSize.setValue(event.pageSize);
    this.formSearch.updateValueAndValidity();
  }

  pageSelectedChanged(event: PageNumberChangedEvent): void{
    this.formSearch.controls.PageNumber.setValue(event.pageNumber);
    this.formSearch.updateValueAndValidity();
  }
}
