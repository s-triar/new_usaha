import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MainStateService } from '../services/main-state.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule
  ]
})
export class EnterpriseComponent implements OnInit {

  constructor(
    private mainStateViewService: MainStateService,
  ) { }

  ngOnInit(): void {
    this.mainStateViewService.changeViewState({
      isFooterBarNeedToBeShown: false
    });
  }

}
