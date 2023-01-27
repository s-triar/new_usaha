import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DASHBOARD_ROUTE } from 'src/app/core/constant/routes';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardNavComponent
  ]
})
export class DashboardComponent implements OnInit {
  idUsaha!: string;
  PARAM_DASHBOARD_ID_USAHA = DASHBOARD_ROUTE._ID_USAHA;

  constructor(
    private routes: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.idUsaha = params[this.PARAM_DASHBOARD_ID_USAHA.substr(1)];
      // console.log(this.idUsaha);
    });
  }

}
