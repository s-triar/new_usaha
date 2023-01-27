import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { WORKSPACE_ROUTE, DASHBOARD_ROUTE, GLOBAL_PATH } from 'src/app/core/constant/routes';
import { MyEnterpriseDto } from 'src/app/domain/backend/Dtos';


@Component({
  selector: 'app-my-businesses-list-item',
  templateUrl: './my-businesses-list-item.component.html',
  styleUrls: ['./my-businesses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule
  ]
})
export class MyBusinessesListItemComponent  {
  @Input()
  data!: MyEnterpriseDto;
  defaultWorkspace = WORKSPACE_ROUTE.CASHIER;
  defaultDashboard = DASHBOARD_ROUTE.OVERVIEW;

  pathWORKSPACE = GLOBAL_PATH.WORKSPACE;
  pathDASHBOARD = GLOBAL_PATH.DASHBOARD;
  constructor() { }



}
