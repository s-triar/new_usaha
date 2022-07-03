import { Component,  OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators  } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, debounceTime, delay, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { EMPTY } from 'rxjs';
import { EnterpriseCodeAvailabilityValidator } from '../../../../../../../application/form-validators/EnterpriseCodeValidator';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { ButtonUploadFileComponent } from 'src/app/ui/components/form/button-upload-file/button-upload-file.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BUSINESS_DEFAULT } from 'src/app/application/constant';
import { CustomUploadFileEventChange } from 'src/app/application/types';
import { EnterpriseTypeDto } from 'src/app/domain/backend/Dtos';
import { EnterpriseTypeService } from 'src/app/infrastructure/backend/enterprise-type.service';
import { EnterpriseService } from 'src/app/infrastructure/backend/enterprise.service';
import { MainStateService } from 'src/app/ui/pages/main/components/main-nav/main-state.service';
import { PopUpConfirmationService } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
// import { PopUpNotifService } from 'src/app/components/pop-up-ku/services/pop-up-ku-notif.service';


@UntilDestroy()
@Component({
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    ButtonUploadFileComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,

  ]
})
export class AddBusinessComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    Name: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(255)] ),
    Code: this.formBuilder.nonNullable.control('', [Validators.required, Validators.maxLength(255)],
                                                   [EnterpriseCodeAvailabilityValidator.validate(this.enterpriseService)]),
    Description: this.formBuilder.control<string|null>(null, [Validators.maxLength(255)]),
    EnterpriseTypeId: this.formBuilder.nonNullable.control<number>(1, [Validators.required]),
    Photo: this.formBuilder.control<null|string|ArrayBuffer>(null),
    PhotoFile: this.formBuilder.control<null|File>(null),
    Phone: this.formBuilder.nonNullable.control<string>('', [Validators.required,  Validators.pattern('[0-9]+')]),
    Email: this.formBuilder.nonNullable.control<string>('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    Address: this.formBuilder.nonNullable.group({
      Street: this.formBuilder.nonNullable.control<string>('', [Validators.required, Validators.maxLength(255)]),
      SubDistrict: this.formBuilder.nonNullable.control<string>('', [Validators.required, Validators.maxLength(255)] ),
      District: this.formBuilder.nonNullable.control<string>('', [Validators.required, Validators.maxLength(255)]),
      City: this.formBuilder.nonNullable.control<string>('', [Validators.required, Validators.maxLength(255)]),
      Province: this.formBuilder.nonNullable.control<string>('', [Validators.required, Validators.maxLength(255)]),
      PostalCode: this.formBuilder.nonNullable.control<string>('', [Validators.required, Validators.maxLength(6)]),
      Latitude: this.formBuilder.control<string>(''),
      Longitude: this.formBuilder.control<string>(''),
    })
  });
  url: string|null|ArrayBuffer = null;
  enterpriseTypes$: Observable<EnterpriseTypeDto[]> = new Observable<EnterpriseTypeDto[]>();
  codes: string[] = [];

  defaulImg: string = BUSINESS_DEFAULT;

  isWeb$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    untilDestroyed(this),
    map(result => result.matches),
    shareReplay()
  );
  constructor(
    private formBuilder: FormBuilder,
    private enterpriseTypeService: EnterpriseTypeService,
    private confirmService: PopUpConfirmationService,
    private notifService: PopUpNotifService,
    private mainStateService: MainStateService,
    private location: Location,
    private breakpointObserver: BreakpointObserver,
    private enterpriseService: EnterpriseService
    ) {

    }

  ngOnInit(): void {
    this.enterpriseTypes$ = this.enterpriseTypeService.getAll();
    this.mainStateService.changeViewState({isFooterBarNeedToBeShown: false});
    this.form.controls.Name.valueChanges
            .pipe(
              untilDestroyed(this),
              debounceTime(700),
              distinctUntilChanged(),
              switchMap(x => this.enterpriseService.GetAvailableEnterpriseCode({Name: x}))
            )
            .subscribe(x => {
              this.codes = x;
            });
  }
  changed(event: CustomUploadFileEventChange): void{
    if (event.file !== null){
      this.url = event.dataFile;
      this.form.patchValue({
        PhotoFile: event.file,
        Photo: event.file?.name
      });
    }
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }
  get Name(): AbstractControl|null{
    return this.form.get('Name');
  }
  get Code(): AbstractControl|null{
    return this.form.get('Code');
  }
  get EnterpriseTypeId(): AbstractControl|null{
    return this.form.get('EnterpriseTypeId');
  }
  get Description(): AbstractControl|null{
    return this.form.get('Description');
  }
  get Photo(): AbstractControl|null{
    return this.form.get('Photo');
  }
  get PhotoFile(): AbstractControl|null{
    return this.form.get('PhotoFile');
  }
  get Phone(): AbstractControl|null{
    return this.form.get('Phone');
  }
  get Email(): AbstractControl|null{
    return this.form.get('Email');
  }
  get AddressStreet(): AbstractControl|null{
    return this.form.get('Address.Street');
  }
  get AddressSubDistrict(): AbstractControl|null{
    return this.form.get('Address.SubDistrict');
  }
  get AddressDistrict(): AbstractControl|null{
    return this.form.get('Address.District');
  }
  get AddressCity(): AbstractControl|null{
    return this.form.get('Address.City');
  }
  get AddressProvince(): AbstractControl|null{
    return this.form.get('Address.Province');
  }
  get AddressPostalCode(): AbstractControl|null{
    return this.form.get('Address.PostalCode');
  }
  get AddressLatitude(): AbstractControl|null{
    return this.form.get('Address.Latitude');
  }
  get AddressLongitude(): AbstractControl|null{
    return this.form.get('Address.Longitude');
  }
  submitForm(): void{
    if (this.form.valid){
      this.confirmService.show(
        {
          title: 'Apa Anda Yakin?',
          buttonTheme: 'primary',
          message: 'Pastikan data yang diisi sudah benar. Jika sudah yakin tekan OK.'
        }
        )
        .afterClosed()
        .pipe(
            untilDestroyed(this),
            switchMap((x: any) => {
              if (!!x){
                return this.enterpriseService.create(this.form.value);
              }
              return of(undefined);
            }),
            switchMap(x => {
              if (!!x){
                return this.notifService.show({message: 'Usaha berhasil dibuat.', title: 'Sukses', type: 'success'}).afterClosed();
              }
              return of(undefined);
            })
        )
        .subscribe(x => {
          if (!!x) {this.location.back(); }
        });
    }
  }
}

