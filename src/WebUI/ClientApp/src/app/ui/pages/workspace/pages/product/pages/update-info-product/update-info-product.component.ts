import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { FormUpdateInfoProductKuComponent } from 'src/app/ui/modules/product-ku/form-update-info-product-ku/form-update-info-product-ku.component';
import { WORKSPACE_ROUTE } from 'src/app/core/constant/routes';
import { InfoOfGoodsForUpdatingDto } from 'src/app/domain/backend/Dtos';
import { WorkspaceStateService } from '../../../../components/workspace-nav/workspace-state.service';

@Component({
  templateUrl: './update-info-product.component.html',
  styleUrls: ['./update-info-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    FormUpdateInfoProductKuComponent
  ]
})
export class UpdateInfoProductComponent implements OnInit {
  titlePage = 'Ubah Info Produk';
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  idUsaha!: string;
  dataGoods!: InfoOfGoodsForUpdatingDto;
  constructor(
    private readonly routes: ActivatedRoute,
    private readonly location: Location,
    private readonly wsStateService: WorkspaceStateService,
  ) {

  }

  ngOnInit(): void {
    this.wsStateService.changeViewState({
      isFooterBarNeedToBeShown: false,
      isSearchBarNeedToBeShown: false,
      isTabBarNeedToBeShown: false
    });
    this.idUsaha = this.routes.parent?.parent?.parent?.snapshot.paramMap.get(WORKSPACE_ROUTE._ID_USAHA.substring(1))!;
    this.dataGoods = this.routes.snapshot.data.dataGoods;
    console.log(this.idUsaha, this.dataGoods, this.routes.snapshot.data);
  }
  submitted(): void{
    this.location.back();
  }
  canceled(): void{
    this.location.back();
  }
}
