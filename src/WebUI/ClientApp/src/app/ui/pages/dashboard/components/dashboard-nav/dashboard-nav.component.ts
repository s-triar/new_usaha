import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DashboardStateService, DashboardViewState } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { DASHBOARD_EMPLOYEE_ROUTE, DASHBOARD_ROUTE, DB_OVERVIEW, DB_TRANS_ROUTE, GLOBAL_PATH } from 'src/app/core/constant/routes';
import { Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonBackDirective } from 'src/app/ui/directives/button-back/button-back.directive';
import { DataNavList } from 'src/app/core/types';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';

@UntilDestroy()
@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    ButtonBackDirective,
    MatButtonModule,
    MatIconModule
  ]

})
export class DashboardNavComponent implements OnInit {
  icons = {
    home: 'home',
    menu: 'menu',
    close: 'close'
  };
  @Input() idUsaha!: string;
  linkBack = GLOBAL_PATH.MAIN_MY_BUSSINESSES_LIST;
  viewState: DashboardViewState = {
    currentTab: '',
    isFooterBarNeedToBeShown: false,
  };
  PARAM_DASHBOARD_ID_USAHA = DASHBOARD_ROUTE._ID_USAHA;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  navListBluePrint: string[] = [
    GLOBAL_PATH.DASHBOARD_OVERVIEW,
    GLOBAL_PATH.DASHBOARD_TRANSACTION_LIST,
    GLOBAL_PATH.DASHBOARD_PRODUCT_LIST,
    GLOBAL_PATH.DASHBOARD_EMPLOYEE_LIST,
    GLOBAL_PATH.DASHBOARD_EMPLOYEE_LIST,
  ];
  navlist: DataNavList[] = [
    {
      link: GLOBAL_PATH.DASHBOARD_OVERVIEW,
      data: {
        icon: 'dashboard',
        text: 'Overview'
      },
      type: DB_OVERVIEW._KEY_
    },
    {
      link: GLOBAL_PATH.DASHBOARD_TRANSACTION_LIST,
      data: {
        icon: 'receipt',
        text: 'Transaksi'
      },
      type: DB_TRANS_ROUTE._KEY_
    },
    {
      link: GLOBAL_PATH.DASHBOARD_PRODUCT_LIST,
      data: {
        icon: 'inventory_2',
        text: 'Produk'
      },
      type: DB_TRANS_ROUTE._KEY_
    },
    {
      link: GLOBAL_PATH.DASHBOARD_EMPLOYEE_LIST,
      data: {
        icon: 'supervisor_account',
        text: 'Karyawan'
      },
      type:  DASHBOARD_EMPLOYEE_ROUTE._KEY_
    },
    {
      link: GLOBAL_PATH.DASHBOARD_EMPLOYEE_LIST,
      data: {
        icon: 'diversity_1',
        text: 'Pelanggan'
      },
      type:  DASHBOARD_EMPLOYEE_ROUTE._KEY_
    },
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardStateService: DashboardStateService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    ) {}
  ngOnInit(): void {
    this.dashboardStateService.viewState.pipe(untilDestroyed(this))
    .subscribe(x => {
      this.viewState = x;
      this.cdr.detectChanges();
    });
    for (let i = 0; i < this.navListBluePrint.length; i++){
      const l = this.navListBluePrint[i];
      const lsplit = l.split(this.PARAM_DASHBOARD_ID_USAHA);
      this.navlist[i].link = lsplit[0] + this.idUsaha + lsplit[1];
    }
  }

}
