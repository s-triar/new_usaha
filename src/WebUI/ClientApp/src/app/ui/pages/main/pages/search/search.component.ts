import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppViewService } from 'src/app/infrastructure/backend/app-view.service';
import { ShowCaseItemComponent } from 'src/app/ui/components/card/show-case-item/show-case-item.component';
import { MainStateService } from 'src/app/ui/pages/main/components/main-nav/main-state.service';
import { NavSearchComponent } from 'src/app/ui/components/nav/nav-search/nav-search.component';
import { PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';


@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavSearchComponent,
    ShowCaseItemComponent,
    PaginationComponent
  ]
})
export class SearchComponent implements OnInit {
  deviceSize = 'web';

  constructor(
    private mainStateViewService: MainStateService,
    private appViewService: AppViewService
  ) { }

  ngOnInit(): void {
    this.mainStateViewService.changeViewState({
      isFooterBarNeedToBeShown: false
    });
    this.appViewService.device.pipe(untilDestroyed(this))
        .subscribe(device => this.deviceSize = device);
  }
  goToShop(): void{}

}
