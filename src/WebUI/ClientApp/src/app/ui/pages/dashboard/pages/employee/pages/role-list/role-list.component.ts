import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, tap, ignoreElements, switchMap } from 'rxjs/operators';
import { DASHBOARD_ROUTE, DB_EMPY_ROLE_ROUTE } from 'src/app/core/constant/routes';
import { EnterpriseRoleDto } from 'src/app/domain/backend/Dtos';
import { RoleService } from 'src/app/ui/pages/dashboard/pages/employee/role.service';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PageNumberChangedEvent, PageSizeChangedEvent, PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { SearchPageRequest } from '../../../../../../../domain/backend/Queries';
import { MatIconModule } from '@angular/material/icon';

@UntilDestroy()
@Component({
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    SearchInputBarcodeComponent,
    MatListModule,
    MatButtonModule,
    ReactiveFormsModule,
    PaginationComponent,
    MatIconModule
  ]
})
export class RoleListComponent implements OnInit {
  @ViewChild(PaginationComponent, {static: true}) pagination!: PaginationComponent;
  idUsaha!: string;

  formSearch: FormGroup = this.formBuilder.group({
    EnterpriseId: [null, [Validators.required]],
    Search: [''],
    PageSize: [20],
    PageNumber: [1]
  });
  list: EnterpriseRoleDto[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardStateService: DashboardStateService,
    private roleService: RoleService
  ) {

  }

  ngOnInit(): void {
    this.dashboardStateService.changeViewState({isFooterBarNeedToBeShown: true});
    this.idUsaha = this.activatedRoute.parent?.parent?.parent?.snapshot.paramMap.get(DASHBOARD_ROUTE._ID_USAHA.substring(1))!;
    console.log(this.idUsaha);

    this.formSearch.controls.Search.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(700),
      tap(x => {
        this.pagination.setPageValue(1);
      }),
      ignoreElements()
    ).subscribe(x => console.log('ignored'));
    this.formSearch.valueChanges.pipe(
      untilDestroyed(this),
      switchMap((x:SearchPageRequest) => this.roleService.getEnterpriseRolePage(x))
    )
    .subscribe(x => {
      this.list = x.items;
      this.pagination.setPagesNumbers(x.totalPages);
    });

    this.formSearch.controls.EnterpriseId.setValue(this.idUsaha);
    this.setPaginationConfig();
  }
  goToForm(id: string|null= null): void{
    if (id === null){
      this.router.navigate([`${DB_EMPY_ROLE_ROUTE.ROLE_ADD}`], {relativeTo: this.activatedRoute});

    }
    else{
      this.router.navigate([`${DB_EMPY_ROLE_ROUTE.ROLE_INFO}`, id], {relativeTo: this.activatedRoute});
    }
  }
  setPaginationConfig(): void{
    this.pagination.setPageSize(this.formSearch.controls.PageSize.value);
    this.pagination.setPagesNumbers(this.formSearch.controls.PageNumber.value);
  }

  paginationNChanged(event: PageSizeChangedEvent): void{
    this.formSearch.controls.PageSize.setValue(event.pageSize);
    this.formSearch.updateValueAndValidity();
  }

  pageSelectedChanged(event: PageNumberChangedEvent): void{
    this.formSearch.controls.PageNumber.setValue(event.pageNumber);
    this.formSearch.updateValueAndValidity();
  }

  goToDetail(id: string): void{
    this.router.navigate(['.', DB_EMPY_ROLE_ROUTE.ROLE_INFO, id], {relativeTo: this.activatedRoute});
  }
}
