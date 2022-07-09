import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BUSINESS_DEFAULT } from 'src/app/application/constant';
import { GLOBAL_PATH } from 'src/app/application/constant/routes';
import { DataAddBusiness } from 'src/app/application/types';
import { MyEnterpriseDto } from 'src/app/domain/backend/Dtos';
import { MyBussinessService } from 'src/app/infrastructure/backend/my-bussiness.service';
import { MainStateService } from 'src/app/ui/pages/main/components/main-nav/main-state.service';
import { AddBusinessDialogComponent } from 'src/app/ui/components/pop-up/add-business-dialog/add-business-dialog.component';
import { MyBusinessesListItemComponent } from 'src/app/ui/components/card/my-businesses-list-item/my-businesses-list-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
    MatIconModule
  ]
})
export class BussinessListComponent implements OnInit, OnDestroy {
  icons = {
    add: 'add'
  };
  messageStatusListDEFAULT = 'Belum ada usaha. <br/><br/> Ayo buat usahamu sendiri.';
  messageStatusList = this.messageStatusListDEFAULT;
  formSearch = this.formBuilder.nonNullable.group({
    Name: this.formBuilder.nonNullable.control('')
  });
  t: number[] = [];
  businessOptionList: DataAddBusiness[] = [
    {
        description: 'Menambahkan usaha milik anda pribadi',
        link: GLOBAL_PATH.MAIN_MY_BUSSINESSES_ADD,
        title: 'Baru'
    },
    {
        description: 'Menambahkan usaha milik orang lain yang mana anda bekerja di dalamnya',
        link: GLOBAL_PATH.MAIN_MY_BUSSINESSES_JOIN,
        title: 'Bergabung'
    },
  ];
  mybusinesseslist$!: Observable<MyEnterpriseDto[]>;
  private search!: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    untilDestroyed(this),
    map(result => result.matches),
    shareReplay()
  );
  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
  .pipe(
    untilDestroyed(this),
    map(result => result.matches),
    shareReplay()
  );
  isWeb$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
  .pipe(
    untilDestroyed(this),
    map(result => result.matches),
    shareReplay()
  );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private myBussinessService: MyBussinessService,
    private mainStateService: MainStateService,

    ) {
    }

  ngOnDestroy(): void {
    this.search.unsubscribe();
  }

  ngOnInit(): void {
    this.mainStateService.changeViewState({isFooterBarNeedToBeShown: true});
    this.getEnterpriseOwned();
    this.search = this.formSearch.controls.Name.valueChanges.pipe(
            untilDestroyed(this),
            debounceTime(600),
            distinctUntilChanged()
          ).subscribe(x =>
            this.getEnterpriseOwned()
          );
  }
  addBusinessDialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.businessOptionList;
    const dialogRef = this.dialog.open(AddBusinessDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (!!result){
        this.router.navigateByUrl(result);
      }
    });
  }
  getEnterpriseOwned(): void{
    this.mybusinesseslist$ = this.myBussinessService.getOwned({Name: this.formSearch.controls.Name.value})
                                  .pipe(
                                    map(x => {
                                      for (const iterator of x) {
                                        iterator.photo = iterator.photo ?? BUSINESS_DEFAULT;
                                      }
                                      return x;
                                    }),
                                    tap(x => {
                                      if (x.length === 0 && (this.formSearch.controls.Name.value === '')){
                                        this.messageStatusList = this.messageStatusListDEFAULT;
                                      }else if (x.length === 0){
                                        this.messageStatusList = 'Tidak menemukan usaha yang dicari.';
                                      }
                                    }),
                                  );
  }
  searchEnterpriseSubmit(): void{
    this.getEnterpriseOwned();
  }
}
