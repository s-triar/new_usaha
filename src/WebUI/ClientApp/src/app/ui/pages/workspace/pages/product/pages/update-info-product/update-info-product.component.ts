import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { FormUpdateInfoProductKuComponent } from 'src/app/ui/modules/product-ku/form-update-info-product-ku/form-update-info-product-ku.component';
import { WORKSPACE_ROUTE, WS_PRODUCT } from 'src/app/core/constant/routes';
import { InfoOfGoodsForUpdatingDto } from 'src/app/domain/backend/Dtos';
import { WorkspaceStateService } from '../../../../components/workspace-nav/workspace-state.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { MyGoodsService } from 'src/app/ui/modules/product-ku/services/my-goods.service';

@Component({
  templateUrl: './update-info-product.component.html',
  styleUrls: ['./update-info-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    FormUpdateInfoProductKuComponent,
  ],
  providers: [MyGoodsService],
})
export class UpdateInfoProductComponent implements OnInit {
  titlePage = 'Ubah Info Produk';
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  // idUsaha!: string;
  // dataGoods!: InfoOfGoodsForUpdatingDto;
  idUsaha$!: Observable<string>;
  dataGoods$!: Observable<InfoOfGoodsForUpdatingDto>;
  constructor(
    private readonly routes: ActivatedRoute,
    private readonly location: Location,
    private readonly wsStateService: WorkspaceStateService,
    private readonly myGoodsService: MyGoodsService
  ) {}

  ngOnInit(): void {
    this.wsStateService.changeViewState({
      isFooterBarNeedToBeShown: false,
      isSearchBarNeedToBeShown: false,
      isTabBarNeedToBeShown: false,
    });
    // this.idUsaha = this.routes.parent?.parent?.parent?.snapshot.paramMap.get(WORKSPACE_ROUTE._ID_USAHA.substring(1))!;
    // this.dataGoods = this.routes.snapshot.data.dataGoods;
    // console.log(this.idUsaha, this.dataGoods, this.routes.snapshot.data);
    this.idUsaha$ = this.routes.parent?.parent?.paramMap.pipe(
      map((x) => x.get(WORKSPACE_ROUTE._ID_USAHA.substring(1))),
    );
    // this.dataGoods = this.routes.snapshot.data.dataGoods;
    this.dataGoods$ = this.routes.paramMap.pipe(
      map(x=>x.get(WS_PRODUCT._ID_PRODUCT_INFO.substring(1))),
      switchMap((x) => this.myGoodsService.getInfoGoodsForUpdate({ Id: x }))
    );
  }
  submitted(): void {
    this.location.back();
  }
  canceled(): void {
    this.location.back();
  }
}
