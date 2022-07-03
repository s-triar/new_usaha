import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, tap, ignoreElements, switchMap } from 'rxjs/operators';
import { DASHBOARD_ROUTE, DASHBOARD_EMPLOYEE_ROUTE } from 'src/app/application/constant/routes';
import { EnterpriseEmployeeDto } from 'src/app/domain/backend/Dtos';
import { EmployeeService } from 'src/app/infrastructure/backend/employee.service';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { PageNumberChangedEvent, PageSizeChangedEvent, PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { FormEmployeePopUpComponent } from './form-employee-pop-up/form-employee-pop-up.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SearchPageRequest } from '../../../../../../../domain/backend/Queries';

@UntilDestroy()
@Component({
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    SearchInputBarcodeComponent,
    PaginationComponent,
    MatListModule,
    MatIconModule,
    PaginationComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(PaginationComponent, {static: true}) pagination!: PaginationComponent;
  idUsaha!: string;
  formSearch: FormGroup = this.formBuilder.group({
    // EnterpriseId: [null, [Validators.required]],
    Search: [''],
    // StartCreatedAt: [null],
    // EndCreatedAt: [null],
    PageSize: [20],
    PageNumber: [1]
  });
  list: EnterpriseEmployeeDto[] = [];
  constructor(
    private dialog: MatDialog,
    private dashboardStateService: DashboardStateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private readonly formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    // tslint:disable-next-line:no-non-null-assertion
    this.idUsaha = this.activatedRoute.parent?.parent?.parent?.snapshot.paramMap.get(DASHBOARD_ROUTE._ID_USAHA.substring(1))!;

  }

  ngOnInit(): void {
    this.dashboardStateService.changeViewState({currentTab: 'Daftar Pegawai', isFooterBarNeedToBeShown: true});
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
      switchMap((x:SearchPageRequest) => this.employeeService.getEnterpriseEmployee(x))
    )
    .subscribe(x => {
      this.list = x.items;
      this.pagination.setPagesNumbers(x.totalPages);
    });

    // this.formSearch.controls.EnterpriseId.setValue(this.idUsaha);
    this.setPaginationConfig();
  }
  gotoRole(): void{
    this.router.navigate(['..', DASHBOARD_EMPLOYEE_ROUTE.ROLE], {relativeTo: this.activatedRoute});
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
  openForm(): void{
    const dialogRef = this.dialog.open(FormEmployeePopUpComponent, {data: {id: null, mode: 'create'}});

  }
}
