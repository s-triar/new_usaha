import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WORKSPACE_ROUTE, WS_PRODUCT, GLOBAL_PATH } from 'src/app/application/constant/routes';
import { WorkspaceStateService } from '../../components/workspace-nav/workspace-state.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ProductComponent implements OnInit {
  idUsaha!: string;
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  PARAM_PRODUCT_ID_PRODUCT_INFO = WS_PRODUCT._ID_PRODUCT_INFO;
  // products$: Observable<MyGoodsesDto[]> = new Observable<MyGoodsesDto[]>();
  linkToAddBluePrint = GLOBAL_PATH.WORKSPACE_PRODUCT_ADD;
  linkToInfoBluePrint = GLOBAL_PATH.WORKSPACE_PRODUCT_INFO;
  linkToAdd!: string;
  info1!: string;
  info2!: string;
  // linkToInfo!: string;
  constructor(
    private routes: ActivatedRoute,
    private wsStateService: WorkspaceStateService

    ) {
    this.routes.parent?.params.subscribe(params => {
      this.idUsaha = params[this.PARAM_WORKSPACE_ID_USAHA.substring(1)];
      const addSplit = this.linkToAddBluePrint.split(this.PARAM_WORKSPACE_ID_USAHA);
      this.linkToAdd = addSplit[0] + this.idUsaha + addSplit[1];
    });
  }


  ngOnInit(): void {
    this.loadGoodses('');
    // this.wsStateService.changeTab(WS_PRODUCT._KEY_);
    this.wsStateService.changeViewState({
      currentTab: WS_PRODUCT._KEY_,
      isFooterBarNeedToBeShown: true,
      isSearchBarNeedToBeShown: true,
      isTabBarNeedToBeShown: true
    });
  }

  loadGoodses(search: string): void{
    // this.store.dispatch(LoadGoodses({
    //   payload: {
    //     EnterpriseId: this.idUsaha,
    //     N: 20,
    //     Page: 1,
    //     Search: search
    //   }
    // }));
  }

  generateUrlInfo(id: string): string{
    let infoSplit = this.linkToInfoBluePrint.split(this.PARAM_WORKSPACE_ID_USAHA);
    const tempInfo = infoSplit[0] + this.idUsaha + infoSplit[1];
    infoSplit = tempInfo.split(this.PARAM_PRODUCT_ID_PRODUCT_INFO);
    const res =   infoSplit[0] + id + infoSplit[1];
    return res;
  }

}
