import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { GLOBAL_PATH } from 'src/app/core/constant/routes';
import { DataNavList } from 'src/app/core/types';
import { MainStateState, MainStateService } from './main-state.service';
import { MatIconModule } from '@angular/material/icon';
// import { faSearch, faComment, faBell, faHome, faUser, faUsers, faShoppingBasket, faBuilding } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@UntilDestroy()
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class MainNavComponent implements OnInit {

  viewState: MainStateState = {
    isFooterBarNeedToBeShown: true
  };

  navListTop: DataNavList[] = [
    {
      link: GLOBAL_PATH.MAIN_SEARCH,
      data: {
        // icon: 'fa fa-search',
        icon: 'search',
        text: 'Pencarian'
      },
      type: 'default'
    },
    {
      link: GLOBAL_PATH.MAIN_QUICK_CHAT,
      data: {
        // icon: 'fa fa-comments',
        icon: 'question_answer',
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

  navListDown: DataNavList[] = [
    {
      link: GLOBAL_PATH.MAIN_HOME,
      data: {
        icon: 'window',
        text: 'Home'
      },
      type: 'default'
    },
    {
      link: GLOBAL_PATH.MAIN_PROFILE,
      data: {
        icon: 'person',
        text: 'Profil'
      },
      type: 'default'
    },
    {
      link: GLOBAL_PATH.SOCIAL,
      data: {
        icon: 'diversity_2',
        text: 'Sosial'
      },
      type: 'default'
    },
    {
      link: '/main/remote',
      data: {
        icon: 'local_grocery_store',
        text: 'Keranjang'
      },
      type: 'default'
    },
    {
      link: GLOBAL_PATH.MAIN_MY_BUSSINESSES_LIST,
      data: {
        icon: 'store',
        text: 'Usaha'
      },
      type: 'active'
    }

  ];

  // isCollapsed = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private mainStateService: MainStateService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private cdr: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
    this.mainStateService.viewState.pipe(untilDestroyed(this)).subscribe(x => {
      this.viewState = x;
      this.cdr.detectChanges();
    });
  }

}
