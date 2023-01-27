import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AppViewService } from './core/utility/app-view.service';
import { AppToken, APP_TOKEN } from './core/constant/app-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'usahaku-app';
  statusLoading$!: Observable<boolean>;

  constructor(
    // @Inject(APP_TOKEN) private appToken: AppToken,
    // private http: HttpClient,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private appViewService: AppViewService
  ) {

  }
  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Web,
      Breakpoints.Tablet
    ]).subscribe(match => {
      if (match.breakpoints[Breakpoints.HandsetLandscape] || match.breakpoints[Breakpoints.HandsetPortrait]){
        // this.appViewService.device.next('handset');
        this.appViewService.setDevice('handset');
      }
      else if (match.breakpoints[Breakpoints.TabletPortrait] || match.breakpoints[Breakpoints.TabletLandscape]){
        // this.appViewService.device.next('tablet');
        this.appViewService.setDevice('tablet');
      } else{
        this.appViewService.setDevice('web');
        // this.appViewService.device.next('web');
      }
    });

  }
  
}
