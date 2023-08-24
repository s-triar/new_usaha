import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { DASHBOARD_ROUTE, DB_TRANS_ROUTE } from 'src/app/core/constant/routes';
import { DetailOrderDto } from 'src/app/domain/backend/Dtos';
import { TransactionService } from 'src/app/infrastructure/backend/transaction.service';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { GoodsOrderedComponent } from './goods-ordered/goods-ordered.component';
import { MatIconModule } from '@angular/material/icon';
// import { DashboardStateService } from 'src/app/pages/dashboard/services/dashboard-state.service';
// import { TransactionService } from 'src/app/pages/dashboard/services/transaction.service';
// import { DetailOrderDto } from 'src/app/shared/types/Dtos';
// import { DASHBOARD_ROUTE, DB_TRANS_ROUTE } from 'src/app/shared/values/routes';

@Component({
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    MatTabsModule,
    GoodsOrderedComponent,
    MatIconModule
  ]
})
export class DetailTransactionComponent implements OnInit {
  idUsaha!: string;
  idOrder!: string;
  data!: DetailOrderDto;
  constructor(
    private readonly routes: ActivatedRoute,
    private router: Router,
    private dashboardStateService: DashboardStateService,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.dashboardStateService.changeViewState({currentTab: 'Detail Transaksi', isFooterBarNeedToBeShown: false, });
    this.idUsaha = this.routes.parent?.parent?.parent?.snapshot.paramMap.get(DASHBOARD_ROUTE._ID_USAHA.substring(1))!;
    this.idOrder = this.routes.snapshot.paramMap.get(DB_TRANS_ROUTE._ID_ORDER.substring(1))!;
    this.data = this.routes.snapshot.data.data!;
  }

}
