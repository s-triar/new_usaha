import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GLOBAL_PATH, MAIN_ENTERPRISE_ROUTE } from 'src/app/application/constant/routes';
import { AppViewService } from 'src/app/infrastructure/backend/app-view.service';
import { ShowCaseShopItemComponent } from 'src/app/ui/components/card/show-case-shop-item/show-case-shop-item.component';
import { MainStateService } from 'src/app/ui/pages/main/components/main-nav/main-state.service';
import { PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';


@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ShowCaseShopItemComponent,
    PaginationComponent
  ]
})
export class HomeComponent implements OnInit {

  deviceSize = 'web';
  PATH = GLOBAL_PATH.MAIN_ENTERPRISE;
  path = '';
  constructor(
    private mainStateService: MainStateService,
    private appViewService: AppViewService
  ) {

  }

  ngOnInit(): void {
    this.path = this.PATH.split(MAIN_ENTERPRISE_ROUTE._ID_USAHA)[0];
    this.mainStateService.changeViewState({
      isFooterBarNeedToBeShown: true
    });
    this.appViewService.device.pipe(untilDestroyed(this))
        .subscribe(device => this.deviceSize = device);
  }
  goToShop(): void{

  }


}
