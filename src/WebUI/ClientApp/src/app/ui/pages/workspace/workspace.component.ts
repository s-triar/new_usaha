

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WORKSPACE_ROUTE } from 'src/app/application/constant/routes';
import { WorkspaceNavComponent } from './components/workspace-nav/workspace-nav.component';
// import { linkworkspace } from 'src/app/shared/data';
import { WorkspaceStateService } from './components/workspace-nav/workspace-state.service';

@UntilDestroy()
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    WorkspaceNavComponent,
    RouterModule,
    
  ]
})
export class WorkspaceComponent implements OnInit {
  idUsaha!: string;
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  // links = linkworkspace;

  constructor(
    private routes: ActivatedRoute,
    private wsStateService: WorkspaceStateService
    ) {
  }
  ngOnInit(): void {
    this.wsStateService.changeViewState({
      isFooterBarNeedToBeShown: true,
      isSearchBarNeedToBeShown: true,
      isTabBarNeedToBeShown: true
    });
    this.routes.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.idUsaha = params[this.PARAM_WORKSPACE_ID_USAHA.substring(1)];
    });
  }
}
