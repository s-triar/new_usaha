import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, switchMap } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BUSINESS_DEFAULT } from 'src/app/application/constant';
import { GLOBAL_PATH } from 'src/app/application/constant/routes';
import { DataAddBusiness } from 'src/app/application/types';
import {
  MyEnterpriseDto,
  SearchPageResponse,
} from 'src/app/domain/backend/Dtos';
import { MyBussinessService } from 'src/app/infrastructure/backend/my-bussiness.service';
import { MainStateService } from 'src/app/ui/pages/main/components/main-nav/main-state.service';
import { AddBusinessDialogComponent } from 'src/app/ui/pages/main/pages/my-businesses/pages/business-list/add-business-dialog/add-business-dialog.component';
import { MyBusinessesListItemComponent } from 'src/app/ui/components/card/my-businesses-list-item/my-businesses-list-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  PageNumberChangedEvent,
  PageSizeChangedEvent,
  PaginationComponent,
} from 'src/app/ui/components/pagination/pagination/pagination.component';

@UntilDestroy()
@Component({
  templateUrl: './bussiness-list.component.html',
  styleUrls: ['./bussiness-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MyBusinessesListItemComponent,
    MatIconModule,
    PaginationComponent,
  ],
})
export class BussinessListComponent implements OnInit {
  icons = {
    add: 'add',
  };
  @ViewChild(PaginationComponent, { static: true })
  pagination!: PaginationComponent;

  messageStatusListDEFAULT =
    'Belum ada usaha. <br/><br/> Ayo buat usahamu sendiri.';
  messageStatusList = this.messageStatusListDEFAULT;

  formSearch = this.formBuilder.nonNullable.group({
    Search: this.formBuilder.nonNullable.control(''),
    PageSize: this.formBuilder.nonNullable.control(20),
    PageNumber: this.formBuilder.nonNullable.control(1),
  });

  businessOptionList: DataAddBusiness[] = [
    {
      description: 'Menambahkan usaha milik anda pribadi',
      link: GLOBAL_PATH.MAIN_MY_BUSSINESSES_ADD,
      title: 'Baru',
    },
    {
      description:
        'Menambahkan usaha milik orang lain yang mana anda bekerja di dalamnya',
      link: GLOBAL_PATH.MAIN_MY_BUSSINESSES_JOIN,
      title: 'Bergabung',
    },
  ];
  mybusinesseslist!: MyEnterpriseDto[];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      untilDestroyed(this),
      map((result) => result.matches),
      shareReplay()
    );
  isTablet$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Tablet)
    .pipe(
      untilDestroyed(this),
      map((result) => result.matches),
      shareReplay()
    );
  isWeb$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Web)
    .pipe(
      untilDestroyed(this),
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private myBussinessService: MyBussinessService,
    private mainStateService: MainStateService
  ) {}


  ngOnInit(): void {
    this.mainStateService.changeViewState({ isFooterBarNeedToBeShown: true });
    this.searchOwnedEnterprise();
    this.setPaginationConfig();
    this.formSearch.controls.Search.setValue('', { onlySelf: true });
    this.formSearch.controls.Search.updateValueAndValidity();
  }

  addBusinessDialog(): void {
      this.router.navigateByUrl(this.businessOptionList[0].link);
    // JANGAN HAPUS
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = this.businessOptionList;
    // const dialogRef = this.dialog.open(
    //   AddBusinessDialogComponent,
    //   dialogConfig
    // );
    // dialogRef
    //   .afterClosed()
    //   .pipe(untilDestroyed(this))
    //   .subscribe((result) => {
    //     if (!!result) {
    //       this.router.navigateByUrl(result);
    //     }
    //   });
  }
  searchOwnedEnterprise(): void {
    this.formSearch.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((x) =>  this.myBussinessService.getOwned(this.formSearch.getRawValue())),
      tap((x) => this.pagination.setPagesNumbers(x.totalPages)),
      map((x) => x.items),
      map((x) => {
        for (const iterator of x) {
          iterator.photo = iterator.photo ?? BUSINESS_DEFAULT;
        }
        return x;
      }),
      tap(t=>console.log(t))
    ).subscribe(x=>this.mybusinesseslist=x);
  }
  setPaginationConfig(): void {
    this.pagination.setPageSize(this.formSearch.controls.PageSize.value);
    this.pagination.setPagesNumbers(this.formSearch.controls.PageNumber.value);
  }
  paginationNChanged(event: PageSizeChangedEvent): void {
    this.formSearch.controls.PageSize.setValue(event.pageSize);
    this.formSearch.updateValueAndValidity();
  }

  pageSelectedChanged(event: PageNumberChangedEvent): void {
    this.formSearch.controls.PageNumber.setValue(event.pageNumber);
    this.formSearch.updateValueAndValidity();
  }
}
