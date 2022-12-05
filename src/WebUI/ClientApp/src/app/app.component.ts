import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { APP_TOKEN, AppToken } from './application/constant/app-token';
import { AppViewService } from './infrastructure/backend/app-view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'usahaku-app';
  statusLoading$!: Observable<boolean>;

  constructor(
    @Inject(APP_TOKEN) private appToken: AppToken,
    private http: HttpClient,
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
        this.appViewService.device.next('handset');
      }
      else if (match.breakpoints[Breakpoints.TabletPortrait] || match.breakpoints[Breakpoints.TabletLandscape]){
        this.appViewService.device.next('tablet');
      } else{
        this.appViewService.device.next('web');
      }
    });

  }
  
}
