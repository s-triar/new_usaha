import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faClose, faCog } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { delay, map, shareReplay } from 'rxjs/operators';
import { GLOBAL_PATH, WORKSPACE_ROUTE, WS_CASHIER, WS_PRODUCT } from 'src/app/application/constant/routes';
import { DataNavList } from 'src/app/application/types';
import { ButtonBackDirective } from 'src/app/ui/directives/button-back/button-back.directive';

import { WorkspaceSettingComponent } from '../workspace-setting/workspace-setting.component';
import { WorkspaceStateService, WorkspaceViewState } from './workspace-state.service';

@UntilDestroy()
@Component({
  selector: 'app-workspace-nav',
  templateUrl: './workspace-nav.component.html',
  styleUrls: ['./workspace-nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    WorkspaceSettingComponent,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    ButtonBackDirective,
    MatIconModule,
    FontAwesomeModule,
    MatTabsModule,
    MatSnackBarModule
  ]
})
export class WorkspaceNavComponent implements OnInit {
  @Input()
  idUsaha!: string;
  icons = {
    back: faArrowLeft,
    close: faClose,
    setting: faCog
  };
  viewState: WorkspaceViewState = {
    currentTab: '',
    isFooterBarNeedToBeShown: false,
    isSearchBarNeedToBeShown: true,
    isTabBarNeedToBeShown: true
  };

  titleModule = 'Workspace';
  linkBackModule = GLOBAL_PATH.MAIN_MY_BUSSINESSES;
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  navListTop: DataNavList[] = [
    {
      link: GLOBAL_PATH.MAIN_QUICK_CHAT,
      data: {
        icon: 'chat',
        text: 'Chat'
      },
      type: 'default'
    },
    {
      link: GLOBAL_PATH.MAIN_NOTIFICATION,
      data: {
        icon: 'notifications',
        text: 'Notifikasi'
      },
      type: 'default'
    }
  ];
  navListDownBluePrint: string[] = [
    GLOBAL_PATH.WORKSPACE_CASHIER,
    GLOBAL_PATH.WORKSPACE_PRODUCT_LIST,
    // GLOBAL_PATH.WORKSPACE_RAW,
  ];
  navListDown: DataNavList[] = [
    {
      link: GLOBAL_PATH.WORKSPACE_CASHIER,
      data: {
        icon: 'fas fa-cash-register', // 'point_of_sale',
        text: 'Kasir'
      },
      type: WS_CASHIER._KEY_
    },
    {
      link: GLOBAL_PATH.WORKSPACE_PRODUCT_LIST,
      data: {
        icon: 'fas fa-tags', // 'price_check',
        text: 'Produk'
      },
      type: WS_PRODUCT._KEY_
    },
    // {
    //   link: GLOBAL_PATH.WORKSPACE_RAW,
    //   data: {
    //     icon: 'fas fa-percentage',
    //     text: 'Diskon Toko'
    //   },
    //   type: 'default'
    // },

  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private wsStateService: WorkspaceStateService,
    private cdr: ChangeDetectorRef,
    public router: Router
    ) {}

    onWheel(event: WheelEvent): void {
      let p = (event.target as Element).parentElement?.parentElement;
      if (p?.classList.contains('mat-tab-list')){
        p = p?.parentElement;
      }
      if (p !== null && p !== undefined){
        p.scrollLeft += event.deltaY;
        event.preventDefault();
      }
   }
  ngOnInit(): void {
    this.wsStateService.viewState
        .pipe(untilDestroyed(this))
        .subscribe(x => {
          this.viewState = x;
          this.cdr.detectChanges();
        });
    for (let i = 0; i < this.navListDownBluePrint.length; i++){
      const l = this.navListDownBluePrint[i];
      const lsplit = l.split(this.PARAM_WORKSPACE_ID_USAHA);
      this.navListDown[i].link = lsplit[0] + this.idUsaha + lsplit[1];
    }
  }
}