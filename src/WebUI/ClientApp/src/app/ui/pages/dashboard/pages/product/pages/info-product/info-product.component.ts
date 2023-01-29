import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormInfoProductKuComponent } from 'src/app/ui/modules/product-ku/form-info-product-ku/form-info-product-ku.component';
import { WORKSPACE_ROUTE, WS_PRODUCT } from 'src/app/core/constant/routes';
import { InfoOfGoodsForUpdatingDto } from 'src/app/domain/backend/Dtos';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { AddStockProductKuBottomSheetComponent } from 'src/app/ui/modules/product-ku/add-stock-product-ku-bottom-sheet/add-stock-product-ku-bottom-sheet.component';
import { AdjustStockPrroductKuBottomSheetComponent } from 'src/app/ui/modules/product-ku/adjust-stock-prroduct-ku-bottom-sheet/adjust-stock-prroduct-ku-bottom-sheet.component';
import { FormUpdatePriceProductData, UpdatePriceProductKuBottomSheetComponent } from 'src/app/ui/modules/product-ku/update-price-product-ku-bottom-sheet/update-price-product-ku-bottom-sheet.component';

import { WholeSalesPrice } from 'src/app/ui/modules/product-ku/form-update-price-product-ku/form-update-price-product-ku.component';
import { NSoldChartComponent } from '../../components/n-sold-chart/n-sold-chart.component';
import { SellPriceChartComponent } from '../../components/sell-price-chart/sell-price-chart.component';
import { BuyPriceChartComponent } from '../../components/buy-price-chart/buy-price-chart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyGoodsService } from 'src/app/ui/modules/product-ku/services/my-goods.service';

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
    NSoldChartComponent,
    SellPriceChartComponent,
    BuyPriceChartComponent,
    MatSnackBarModule
  ],
  providers:[
    MyGoodsService
  ]
})
export class InfoProductComponent implements OnInit {
  titlePage = 'Info Produk';
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  URL_UPDATE_PATTERN = WS_PRODUCT.PRODUCT_UPDATE;
  idUsaha!: string;
  dataGoods!: InfoOfGoodsForUpdatingDto;
  constructor(
    private readonly routes: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    // private readonly wsStateService: WorkspaceStateService,
    private bottomSheet: MatBottomSheet,
    private readonly goodsService: MyGoodsService
  ) {}

  ngOnInit(): void {
    // this.wsStateService.changeViewState({
    //   isFooterBarNeedToBeShown: false,
    //   isSearchBarNeedToBeShown: false,
    //   isTabBarNeedToBeShown: false,
    // });
    this.idUsaha = this.routes.parent?.parent?.parent?.snapshot.paramMap.get(
      WORKSPACE_ROUTE._ID_USAHA.substring(1)
    )!;
    this.dataGoods = this.routes.snapshot.data.dataGoods;
  }
  renewInfo(): void{
    this.goodsService.getInfoGoodsForUpdate({Id: this.dataGoods.id})
        .pipe(untilDestroyed(this))
        .subscribe(x => this.dataGoods = x);
  }

  update(): void {
    this.router.navigate([ this.URL_UPDATE_PATTERN, this.dataGoods.id], {
      relativeTo: this.routes.parent,
    });
  }

  updatePrice(): void {
    const d:FormUpdatePriceProductData={
      id:this.dataGoods.id,
      wholesaleprices:this.dataGoods.wholePrices.map(x=> {
        const t:WholeSalesPrice = {wholesalerPrice: x.wholesalerPrice, wholesalerMin: x.wholesalerMin}
        return t;
      })
    }
    this.bottomSheet.open(UpdatePriceProductKuBottomSheetComponent,
      {
        data: d
      }).afterDismissed()
        .subscribe((x: string|null|undefined) => {
          this.renewInfo();
      });
  }
  addStock(): void {
    this.bottomSheet.open(AddStockProductKuBottomSheetComponent,
      {
        data: this.dataGoods.id
      }).afterDismissed()
        .subscribe((x: string|null|undefined) => {
          this.renewInfo();
      });
  }
  adjustStock(): void {
    this.bottomSheet.open(AdjustStockPrroductKuBottomSheetComponent,
      {
        data: this.dataGoods.id
      }).afterDismissed()
        .subscribe((x: string|null|undefined) => {
          this.renewInfo();
      });
  }
}
