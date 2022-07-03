import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { iif } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, distinctUntilKeyChanged, ignoreElements, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { DASHBOARD_ROUTE, DB_TRANS_ROUTE } from 'src/app/application/constant/routes';
import { OrderDto } from 'src/app/domain/backend/Dtos';
import { TransactionService } from 'src/app/infrastructure/backend/transaction.service';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { PageNumberChangedEvent, PageSizeChangedEvent, PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { GetOrderEnterpriseQuery } from '../../../../../../../domain/backend/Queries';

@UntilDestroy()
@Component({
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    ReactiveFormsModule,
    SearchInputBarcodeComponent,
    MatListModule,
    PaginationComponent,
    MatButtonModule
  ]
})
export class TransactionListComponent implements OnInit {
  @ViewChild(PaginationComponent, {static: true}) pagination!: PaginationComponent;
  idUsaha!: string;
  formSearch: FormGroup = this.formBuilder.group({
    EnterpriseId: [null, [Validators.required]],
    Search: [''],
    StartCreatedAt: [null],
    EndCreatedAt: [null],
    PageSize: [20],
    PageNumber: [1]
  });
  list: OrderDto[] = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly routes: ActivatedRoute,
    private router: Router,
    private dashboardStateService: DashboardStateService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.dashboardStateService.changeViewState({currentTab: 'Daftar Transaksi', isFooterBarNeedToBeShown: true});
    // tslint:disable-next-line:no-non-null-assertion
    this.idUsaha = this.routes.parent?.parent?.parent?.snapshot.paramMap.get(DASHBOARD_ROUTE._ID_USAHA.substr(1))!;
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
      switchMap((x: GetOrderEnterpriseQuery) => this.transactionService.getEnterpriseTransaction(x))
    )
    .subscribe(x => {
      this.list = x.items;
      this.pagination.setPagesNumbers(x.totalPages);
    });

    this.formSearch.controls.EnterpriseId.setValue(this.idUsaha);
    this.setPaginationConfig();
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
    this.router.navigate(['..', DB_TRANS_ROUTE.TRANS_DETAIL, id], {relativeTo: this.routes});
  }



}
