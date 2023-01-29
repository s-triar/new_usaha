import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  EnterpriseTypeDto,
  EnterpriseTypeService,
} from 'src/app/infrastructure/backend/enterprise-type.service';
import { MyEnterpriseService } from 'src/app/infrastructure/backend/my-enterprise.service';
import { MainStateService } from 'src/app/ui/pages/main/components/main-nav/main-state.service';
import { PopUpConfirmationService } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { AppViewService } from 'src/app/core/utility/app-view.service';
import { EnterpriseCodeAvailabilityValidator } from 'src/app/core/form-validators/EnterpriseCodeValidator';
import { AddBussinessFormComponent } from './ui/add-bussiness-form/add-bussiness-form.component';
import { AddBussinessAddressFormComponent } from './ui/add-bussiness-address-form/add-bussiness-address-form.component';
import { AddBussinessPhotoFormComponent } from './ui/add-bussiness-photo-form/add-bussiness-photo-form.component';
import { PopUpLoadingService } from 'src/app/ui/components/pop-up/pop-up-loading/pop-up-loading.service';

@UntilDestroy()
@Component({
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,

    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    AddBussinessFormComponent,
    AddBussinessAddressFormComponent,
    AddBussinessPhotoFormComponent,
  ],
})
export class AddBusinessComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    Photo: this.formBuilder.nonNullable.group({
      Photo: this.formBuilder.control<null | string | ArrayBuffer>(null),
      PhotoFile: this.formBuilder.control<null | File>(null),
    }),
    Info: this.formBuilder.nonNullable.group({
      Name: this.formBuilder.nonNullable.control('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      Code: this.formBuilder.nonNullable.control(
        '',
        [Validators.required, Validators.maxLength(255)],
        [
          EnterpriseCodeAvailabilityValidator.validate(
            this._myenterpriseService
          ),
        ]
      ),
      Description: this.formBuilder.control<string | null>(null, [
        Validators.maxLength(255),
      ]),
      EnterpriseTypeId: this.formBuilder.nonNullable.control<number>(1, [
        Validators.required,
      ]),
      Phone: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      Email: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
      ]),
    }),
    Address: this.formBuilder.nonNullable.group({
      Street: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      SubDistrict: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      District: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      City: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      Province: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      PostalCode: this.formBuilder.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(6),
      ]),
      Latitude: this.formBuilder.control<number>(0),
      Longitude: this.formBuilder.control<number>(0),
    }),
  });
  enterpriseTypes$: Observable<EnterpriseTypeDto[]> = new Observable<
    EnterpriseTypeDto[]
  >();
  codes$: Observable<string[]> = of([]);
  screenSize$: Observable<string> = this.appView.getDevice();
  submission_form$: Subject<boolean> = new Subject<boolean>();
  formMessage$: Observable<void> = this.submission_form$
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }))
    .pipe(
      tap((x) => {
        if (x === false) {
          this._loadingService.close();
        }
      }),
      filter((x) => !!x),
      switchMap((x) =>
        combineLatest([
          of(x),
          this.confirmService
            .show({
              title: 'Apa Anda Yakin?',
              buttonTheme: 'primary',
              message:
                'Pastikan data yang diisi sudah benar. Jika sudah yakin tekan OK.',
            })
            .afterClosed(),
        ])
      ),
      filter((x, y) => !!y && !!x),
      switchMap((x: any) => this._myenterpriseService.create(this.form.value)),
      switchMap((x) =>
        this.notifService
          .show({
            message: 'Usaha berhasil dibuat.',
            title: 'Sukses',
            type: 'success',
          })
          .afterClosed()
      ),
      tap(() => this.submission_form$.next(false)),
      tap(() => this.location.back()),
      catchError((error, source) => {
        this.submission_form$.next(false);
        return source;
      })
    );
  constructor(
    private appView: AppViewService,
    private formBuilder: FormBuilder,
    private enterpriseTypeService: EnterpriseTypeService,
    private confirmService: PopUpConfirmationService,
    private notifService: PopUpNotifService,
    private _loadingService: PopUpLoadingService,
    private mainStateService: MainStateService,
    private location: Location,
    private _myenterpriseService: MyEnterpriseService
  ) {}

  ngOnInit(): void {
    this.enterpriseTypes$ = this.enterpriseTypeService.getEntepriseType();
    this.mainStateService.changeViewState({ isFooterBarNeedToBeShown: false });

    this.codes$ = this.form.controls.Info.controls.Name.valueChanges.pipe(
      untilDestroyed(this),
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((x) =>
        this._myenterpriseService.GetAvailableEnterpriseCode({ Name: x })
      )
    );
  }
  
  submitForm(): void {
    if (this.form.valid) {
      this.submission_form$.next(true);
    }
  }
}
