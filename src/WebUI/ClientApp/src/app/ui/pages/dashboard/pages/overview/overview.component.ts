import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class OverviewComponent implements OnInit {

  constructor(
    private dashboardStateService: DashboardStateService
  ) {

  }

  ngOnInit(): void {
    this.dashboardStateService.changeViewState({currentTab: 'Overview', isFooterBarNeedToBeShown: false});
  }

}
