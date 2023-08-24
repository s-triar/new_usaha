import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  WORKSPACE_ROUTE,
  WS_PRODUCT,
  GLOBAL_PATH,
} from 'src/app/core/constant/routes';
import {
  MyGoodsesListItemDto,
} from 'src/app/domain/backend/Dtos';
import {
  PageNumberChangedEvent,
  PaginationComponent,
} from 'src/app/ui/components/pagination/pagination/pagination.component';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { MyGoodsService } from 'src/app/ui/modules/product-ku/services/my-goods.service';
import { WorkspaceStateService } from '../../../../components/workspace-nav/workspace-state.service';
import { MyProductListItemComponent } from './ui/my-product-list-item/my-product-list-item.component';

export type MyGoodsesListItemDtoWithLink = MyGoodsesListItemDto & {
  link: string;
};

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
    MatIconModule,
  ],
  providers:[
    MyGoodsService
  ]
})
export class ProductListComponent implements OnInit {
  icons = {
    add: 'add',
  };
  @ViewChild(PaginationComponent, { static: true })
  pagination!: PaginationComponent;

  private listProductContainer!: ElementRef;

  @ViewChild('listProductContainer', { static: false, read: ElementRef })
  set content(content: ElementRef) {
    if (content) {
      this.listProductContainer = content as ElementRef;
    }
  }
  idUsaha!: string;
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  PARAM_PRODUCT_ID_PRODUCT_INFO = WS_PRODUCT._ID_PRODUCT_INFO;
  linkToAddBluePrint = GLOBAL_PATH.WORKSPACE_PRODUCT_ADD;
  linkToInfoBluePrint = GLOBAL_PATH.WORKSPACE_PRODUCT_INFO;
  link_to_add$: Observable<string>;
  info1!: string;
  info2!: string;

  formSearch = this.formBuilder.group({
    Search: this.formBuilder.nonNullable.control(''),
    PageSize: this.formBuilder.nonNullable.control(20),
    PageNumber: this.formBuilder.nonNullable.control(1),
  });
  productList$: Observable<MyGoodsesListItemDtoWithLink[]>;

  constructor(
    private routes: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private wsStateService: WorkspaceStateService,
    private myGoodsService: MyGoodsService
  ) {
    
      
  }

  linkToInfo(id: string): string {
    let temp=this.linkToInfoBluePrint.replace(this.PARAM_WORKSPACE_ID_USAHA, this.idUsaha);
    temp = temp.replace(this.PARAM_PRODUCT_ID_PRODUCT_INFO, id);
    return temp;
  }

  ngOnInit(): void {
    this.link_to_add$ = this.routes.parent?.parent?.params
      .pipe(
        map(params=>{
          this.idUsaha = params[this.PARAM_WORKSPACE_ID_USAHA.substring(1)];
          return this.linkToAddBluePrint.replace(this.PARAM_WORKSPACE_ID_USAHA,this.idUsaha);
        })
      );
    this.wsStateService.changeViewState({
      isFooterBarNeedToBeShown: true,
      isSearchBarNeedToBeShown: true,
      isTabBarNeedToBeShown: true,
    });
    this.searchProduct();

  }
  goto(link: string): void {
    this.router.navigateByUrl(link);
  }

  searchProduct(): void {
    this.productList$ = this.formSearch.valueChanges.pipe(
      startWith(this.formSearch.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((x) =>
        this.myGoodsService.getMyGoodses({
          PageNumber: x.PageNumber,
          PageSize: x.PageSize,
          Search: x.Search,
        })
      ),
      tap((x) => this.pagination.setPagesNumbers(x.totalPages)),
      tap(() => {
        if (
          this.listProductContainer &&
          this.listProductContainer.nativeElement
        ) {
          this.listProductContainer.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }),
      map((x) =>
        x.items.map((y) => {
          const temp: MyGoodsesListItemDtoWithLink = {
            ...y,
            link: this.linkToInfo(y.id),
          };
          return temp;
        })
      )
    );
  }
  pageSelectedChanged(event: PageNumberChangedEvent): void {
    this.formSearch.controls.PageNumber.setValue(event.pageNumber);
    this.formSearch.updateValueAndValidity();
  }
}
