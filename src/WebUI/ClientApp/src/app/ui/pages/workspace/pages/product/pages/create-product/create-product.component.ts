import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { WORKSPACE_ROUTE } from 'src/app/application/constant/routes';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { FormAddProductKuComponent } from 'src/app/ui/modules/product-ku/form-add-product-ku/form-add-product-ku.component';
import { WorkspaceStateService } from '../../../../components/workspace-nav/workspace-state.service';

@UntilDestroy()
@Component({
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    FormAddProductKuComponent
  ]
})
export class CreateProductComponent implements OnInit {
  titlePage = 'Tambah Produk';

  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  idUsaha!: string;

  constructor(
    private readonly routes: ActivatedRoute,
    private readonly location: Location,
    private readonly wsStateService: WorkspaceStateService,
  ) { }

  ngOnInit(): void {
    this.idUsaha = this.routes.parent?.parent?.snapshot.paramMap.get(WORKSPACE_ROUTE._ID_USAHA.substring(1))!;
    console.log(this.idUsaha);

    this.wsStateService.changeViewState({
      isFooterBarNeedToBeShown: false,
      isSearchBarNeedToBeShown: false,
      isTabBarNeedToBeShown: false
    });
  }
  submitted(): void{
    this.location.back();
  }
  canceled(): void{
    this.location.back();
  }
}
