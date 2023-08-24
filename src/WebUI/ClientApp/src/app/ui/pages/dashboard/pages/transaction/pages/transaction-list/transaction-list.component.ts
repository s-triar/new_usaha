import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged,  map, startWith, switchMap, tap } from 'rxjs/operators';
import { DASHBOARD_ROUTE, DB_TRANS_ROUTE } from 'src/app/core/constant/routes';
import { OrderDto } from 'src/app/domain/backend/Dtos';
import { TransactionService } from 'src/app/infrastructure/backend/transaction.service';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { PageNumberChangedEvent, PageSizeChangedEvent, PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { GetOrderEnterpriseQuery } from '../../../../../../../domain/backend/Queries';
import { MatIconModule } from '@angular/material/icon';

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
    MatButtonModule,
    MatIconModule
  ]
})
export class TransactionListComponent implements OnInit {
  @ViewChild(PaginationComponent, {static: true}) pagination!: PaginationComponent;
  idUsaha!: string;
  formSearch: FormGroup = this.formBuilder.group({
    // EnterpriseId: [null, [Validators.required]],
    Search: [''],
    StartCreatedAt: [null],
    EndCreatedAt: [null],
    PageSize: [20],
    PageNumber: [1]
  });
  list$: Observable<OrderDto[]> = this.formSearch.valueChanges.pipe(
    startWith(this.formSearch.value),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap((x: GetOrderEnterpriseQuery) => this.transactionService.getEnterpriseTransaction(x)),
    tap((x) => this.pagination.setPagesNumbers(x.totalPages)),
    map(x=>x.items),
    catchError((err,source)=>source)
  );
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
    this.idUsaha = this.routes.parent?.parent?.snapshot.paramMap.get(DASHBOARD_ROUTE._ID_USAHA.substring(1))!;


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
