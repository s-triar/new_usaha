import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormInfoProductKuComponent } from 'src/app/ui/modules/product-ku/form-info-product-ku/form-info-product-ku.component';
import { WORKSPACE_ROUTE, WS_PRODUCT } from 'src/app/core/constant/routes';
import {
  InfoOfGoodsForUpdatingDto,
  WholesalespriceDto,
} from 'src/app/domain/backend/Dtos';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { AddStockProductKuBottomSheetComponent } from 'src/app/ui/modules/product-ku/add-stock-product-ku-bottom-sheet/add-stock-product-ku-bottom-sheet.component';
import { AdjustStockPrroductKuBottomSheetComponent } from 'src/app/ui/modules/product-ku/adjust-stock-prroduct-ku-bottom-sheet/adjust-stock-prroduct-ku-bottom-sheet.component';
import {
  FormUpdatePriceProductData,
  UpdatePriceProductKuBottomSheetComponent,
} from 'src/app/ui/modules/product-ku/update-price-product-ku-bottom-sheet/update-price-product-ku-bottom-sheet.component';
import { WorkspaceStateService } from '../../../../components/workspace-nav/workspace-state.service';
import { WholeSalesPrice } from 'src/app/ui/modules/product-ku/form-update-price-product-ku/form-update-price-product-ku.component';
import { MyGoodsService } from 'src/app/ui/modules/product-ku/services/my-goods.service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';

@UntilDestroy()
@Component({
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    FormInfoProductKuComponent,
    UpdatePriceProductKuBottomSheetComponent,
    AddStockProductKuBottomSheetComponent,
    AdjustStockPrroductKuBottomSheetComponent,
    MatBottomSheetModule,
  ],
  providers: [MyGoodsService],
})
export class InfoProductComponent implements OnInit, OnDestroy {
  titlePage = 'Info Produk';
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  URL_UPDATE_PATTERN = WS_PRODUCT.PRODUCT_UPDATE;
  idUsaha$!: Observable<string>;
  dataGoods$!: Observable<InfoOfGoodsForUpdatingDto>;
  renew$: BehaviorSubject<undefined> = new BehaviorSubject<undefined>(
    undefined
  );
  constructor(
    private readonly routes: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly wsStateService: WorkspaceStateService,
    private bottomSheet: MatBottomSheet,
    private readonly myGoodsService: MyGoodsService
  ) {}

  ngOnInit(): void {
    this.wsStateService.changeViewState({
      isFooterBarNeedToBeShown: false,
      isSearchBarNeedToBeShown: false,
      isTabBarNeedToBeShown: false,
    });
    this.idUsaha$ = this.routes.parent?.parent?.paramMap.pipe(
      map((x) => x.get(WORKSPACE_ROUTE._ID_USAHA.substring(1))),
    );

    // this.dataGoods = this.routes.snapshot.data.dataGoods;
    this.dataGoods$ = combineLatest([
      this.routes.paramMap.pipe(
        map((x) => x.get(WS_PRODUCT._ID_PRODUCT_INFO.substring(1)))
      ),
      this.renew$,
    ]).pipe(
      tap(([x, u]) => console.log(x, u)),

      switchMap(([x, u]) =>
        this.myGoodsService.getInfoGoodsForUpdate({ Id: x })
      ),
      tap((x) => console.log(x))
    );
  }

  ngOnDestroy(): void {
    this.renew$.complete();
  }

  update(id: string): void {
    this.router.navigate([this.URL_UPDATE_PATTERN, id], {
      relativeTo: this.routes.parent,
    });
  }

  updatePrice(id: string, wholePrices: WholesalespriceDto[]): void {
    const d: FormUpdatePriceProductData = {
      id: id,
      wholesaleprices: wholePrices.map((x) => {
        const t: WholeSalesPrice = {
          wholesalerPrice: x.wholesalerPrice,
          wholesalerMin: x.wholesalerMin,
        };
        return t;
      }),
    };
    this.bottomSheet
      .open(UpdatePriceProductKuBottomSheetComponent, {
        data: d,
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe((x: string | null | undefined) => {
        this.renew$.next(undefined);
      });
  }
  addStock(id: string): void {
    this.bottomSheet
      .open(AddStockProductKuBottomSheetComponent, {
        data: id,
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe((x: string | null | undefined) => {
        this.renew$.next(undefined);
      });
  }
  adjustStock(id: string): void {
    this.bottomSheet
      .open(AdjustStockPrroductKuBottomSheetComponent, {
        data: id,
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe((x: string | null | undefined) => {
        this.renew$.next(undefined);
      });
  }
}
