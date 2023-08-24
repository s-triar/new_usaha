import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { RouterModule } from '@angular/router';
import { BUSINESS_DEFAULT } from 'src/app/core/constant';
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
  defaultImg = BUSINESS_DEFAULT;
  defaultWorkspace = WORKSPACE_ROUTE.CASHIER;
  defaultDashboard = DASHBOARD_ROUTE.OVERVIEW;

  pathWORKSPACE = GLOBAL_PATH.WORKSPACE;
  pathDASHBOARD = GLOBAL_PATH.DASHBOARD;
  constructor() { }

  changeSource(event:Event):void{
    const e = event.target as HTMLImageElement;
    e.src = this.defaultImg;
  }


}
