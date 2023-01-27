import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { GroupProductKuDialogComponent } from '../group-product-ku-dialog/group-product-ku-dialog.component';
import { MemberGroupProductKuDialogComponent } from '../member-group-product-ku-dialog/member-group-product-ku-dialog.component';
import { of, switchMap } from 'rxjs';
import { PRODUCT_DEFAULT } from 'src/app/core/constant';
import { CustomUploadFileEventChange } from 'src/app/core/types';
import { GoodsTypeDto, MyGoodsGroupsListItemDto } from 'src/app/domain/backend/Dtos';
import { GoodsTypeService } from 'src/app/infrastructure/backend/goods-type.service';
import { MyGoodsService } from 'src/app/infrastructure/backend/my-goods.service';
import { ScannerDialogComponent } from 'src/app/ui/components/pop-up/scanner-dialog/scanner-dialog.component';
import { DuplicateBarcodeValidator } from '../../../../core/form-validators/DuplicateBarcodeValidator';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonUploadFileComponent } from 'src/app/ui/components/form/button-upload-file/button-upload-file.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InputCurrencyComponent } from 'src/app/ui/components/form/input-currency/input-currency.component';
import { MatTableModule } from '@angular/material/table';

@UntilDestroy()
@Component({
  selector: 'app-form-add-product-ku',
  templateUrl: './form-add-product-ku.component.html',
  styleUrls: ['./form-add-product-ku.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    ButtonUploadFileComponent,
    FormsModule,
    InputCurrencyComponent,
    MatCheckboxModule,
    MatTableModule
  ]

})
export class FormAddProductKuComponent implements OnInit {

  @Input() idUsaha!: string;
  @Output() Submitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() Canceled: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('selectGoodType', {static: true}) selectGoodType!: MatSelect;
  defaultImg: string = PRODUCT_DEFAULT;
  url: string|null|ArrayBuffer = null;
  urlImg: string|null|ArrayBuffer = null;
  GoodsTypes$Lama!: GoodsTypeDto[] | null|undefined;
  GoodsTypes$!: GoodsTypeDto[];
  GoodsTypesData!: GoodsTypeDto[];
  goodTypeReset: GoodsTypeDto = {
    id: -1,
    name: 'Reset',
    parentGoodsTypeId: null,
    subGoodsTypes: null
  };
  goodTypeBack: GoodsTypeDto = {
    id: -2,
    name: 'Kembali ke sebelumnya',
    parentGoodsTypeId: null,
    subGoodsTypes: null
  };
  temporarySelectedGoodType!: number | null | undefined;
  tempSelectedGoodsGroup: MyGoodsGroupsListItemDto[] = [];
  form: FormGroup = this.fb.group(
    {
      // EnterpriseId: [null, [Validators.required]],
      info: this.fb.group({
        Barcode: [
          null,
          [Validators.required, Validators.maxLength(255)],
          [ DuplicateBarcodeValidator.validate(this.goodsService)]
        ],
        Name: [null, [Validators.required, Validators.maxLength(255)]],
        Description: [null],
        Photo: [null],
        PhotoFile: [null],
        PhotoString: [null],
        GoodsTypeId: [null, [Validators.required]],
        Contain: [1, [Validators.required, Validators.min(1)]],
        AvailableOnline: this.fb.nonNullable.control<boolean>(false),
        ParentBarcode: [null, [Validators.maxLength(255)]],
        GoodsGroups: [this.fb.array([])]
      }),
      pricing: this.fb.group({
        BuyPrice: [0, [Validators.required, Validators.min(0)]],
        Price: [0, [Validators.required, Validators.min(0)]],
        IsWholesalerPriceAuto: [false],

        WholesalesPrices: [this.fb.array([])]
      }),
      stock: this.fb.group({
        N: [0, [Validators.required, Validators.min(0)]],
        Threshold: [0, [Validators.required, Validators.min(0)]],
      })
    }
  );
  get infoGroup(): FormGroup{
    return this.form.controls.info as FormGroup;
  }
  get NameProduct(): AbstractControl|null{
    return this.infoGroup.get('Name');
  }
  get DescriptionProduct(): AbstractControl|null{
    return this.infoGroup.get('Description');
  }
  get BarcodeProduct(): AbstractControl|null{
    return this.infoGroup.get('Barcode');
  }
  get ContainProduct(): AbstractControl|null{
    return this.infoGroup.get('Contain');
  }
  get AvailableOnlineProduct(): AbstractControl|null{
    return this.infoGroup.get('AvailableOnline');
  }
  get PhotoProduct(): AbstractControl|null{
    return this.infoGroup.get('Photo');
  }
  get PhotoFileProduct(): AbstractControl|null{
    return this.infoGroup.get('PhotoFile');
  }
  get PhotoStringProduct(): AbstractControl|null{
    return this.infoGroup.get('PhotoString');
  }
  get GoodsTypeIdProduct(): AbstractControl|null{
    return this.infoGroup.get('GoodsTypeId');
  }
  get ParentBarcodeProduct(): AbstractControl|null{
    return this.infoGroup.get('ParentBarcode');
  }
  get GoodsGroupProduct(): FormArray{
    return this.infoGroup.controls.GoodsGroups as FormArray;
  }
  // ==================================================
  get pricingGroup(): FormGroup{
    return this.form.controls.pricing as FormGroup;
  }
  get BuyPriceProduct(): AbstractControl|null{
    return this.pricingGroup.get('BuyPrice');
  }
  get PriceProduct(): AbstractControl|null{
    return this.pricingGroup.get('Price');
  }
  get WholesalesPricesProduct(): FormArray{
    return this.pricingGroup.controls.WholesalesPrices as FormArray;
  }
  // get WholesalerPriceProduct(): AbstractControl|null{
  //   return this.pricingGroup.get('WholesalerPrice');
  // }
  // get WholesalerMinProduct(): AbstractControl|null{
  //   return this.pricingGroup.get('WholesalerMin');
  // }
  get IsWholesalerPriceAutoProduct(): AbstractControl|null{
    return this.pricingGroup.get('IsWholesalerPriceAuto');
  }
  // ===================================================
  get stockGroup(): FormGroup{
    return this.form.controls.stock as FormGroup;
  }
  get NProduct(): AbstractControl|null{
    return this.stockGroup.get('N');
  }
  get ThresholdProduct(): AbstractControl|null{
    return this.stockGroup.get('Threshold');
  }
  constructor(
    private fb: FormBuilder,
    private readonly goodsService: MyGoodsService,
    private readonly goodsTypeService: GoodsTypeService,
    private dialog: MatDialog,
    private notifService: PopUpNotifService
    ) { }

  ngOnInit(): void {

    this.goodsTypeService.getAll().pipe(untilDestroyed(this)).subscribe(res => {
      if (res.length > 0){
        this.GoodsTypesData = res;
        this.GoodsTypes$ = res.filter(y => y.parentGoodsTypeId === null);
      }
    });
    this.initForm();
    this.infoGroup.valueChanges.subscribe(x => console.log(this.infoGroup.valid));
  }
  submit(): void{
    if (!this.form.valid){
      this.notifService.show({title: 'Form Tidak Valid', message: 'Harap isi form dengan benar. Pastikan tidak ada peringatan.', type: 'warning'})
      .afterClosed().subscribe();
      return;
    }
    const temp = this.form.value;
    temp.info.GoodsGroups = this.GoodsGroupProduct.value.value === null ? []:this.GoodsGroupProduct.value.value;
    const tempPrice = this.WholesalesPricesProduct.value.value === null ?  [] :this.WholesalesPricesProduct.value.value;
    const temp2 = {...temp.info, ...temp.pricing, ...temp.stock};
    temp2.WholesalesPrices = tempPrice;
    console.log(temp2);
    
    this.goodsService.create(temp2)
        .pipe(
          untilDestroyed(this),
          switchMap(x =>
            this.notifService.show({message: "Sukses menambah produk", title: 'Sukses', type: 'success'}).afterClosed()
                             .pipe(switchMap(y => of(x)))
          )
        )
        .subscribe(
          () => this.Submitted.emit()
        );
  }
  initForm(): void{
    this.form = this.fb.group(
      {
        // EnterpriseId: [null, [Validators.required]],
        info: this.fb.group({
          Barcode: [
            null,
            [Validators.required, Validators.maxLength(255)],
            [ DuplicateBarcodeValidator.validate(this.goodsService)]
          ],
          Name: [null, [Validators.required, Validators.maxLength(255)]],
          Description: [null],
          Photo: [null],
          PhotoFile: [null],
          PhotoString: [null],
          GoodsTypeId: [null, [Validators.required]],
          Contain: [1, [Validators.required, Validators.min(1)]],
          AvailableOnline: [false],
          ParentBarcode: [null, [Validators.maxLength(255)]],
          GoodsGroups: [this.fb.array([])]
        }),
        pricing: this.fb.group({
          BuyPrice: [0, [Validators.required]],
          Price: [0, [Validators.required]],
          WholesalesPrices: [this.fb.array([])],

          // WholesalerPrice: [0, [Validators.required]],
          // WholesalerMin: [1, [Validators.required, Validators.min(1)]],
          IsWholesalerPriceAuto: [false],
        }),
        stock: this.fb.group({
          N: [0, [Validators.required, Validators.min(0)]],
          Threshold: [0, [Validators.required, Validators.min(0)]],
        })
      }
    );
  }
  resetForm(): void{
    this.initForm();
  }
  openScanner(): void{
    this.dialog.open(ScannerDialogComponent, {hasBackdrop: true, width: '480px', disableClose: true}).afterClosed().subscribe(x => {
      this.BarcodeProduct?.setValue(null);
      if (x !== undefined){
        this.BarcodeProduct?.setValue(x);
      }
      this.BarcodeProduct?.updateValueAndValidity();
    });
  }
  changed(event: CustomUploadFileEventChange): void{
    if (event.file !== null){
      this.url = event.dataFile;
      this.infoGroup.patchValue({
        PhotoString: event.dataFile,
        PhotoFile: event.file,
        Photo: event.file?.name
      });
      this.PhotoProduct?.updateValueAndValidity();
      this.PhotoFileProduct?.updateValueAndValidity();
      this.PhotoStringProduct?.updateValueAndValidity();
    }
  }
  selectGoodsType(event: MatSelectChange): void{
    const val  = event.value as string;
    const v = parseInt(val, 10);
    const temp = this.GoodsTypesData.find(x => x.id === v);
    // let tempArr: GoodsTypeDto[] = [];
    if (v === this.goodTypeBack.id){
      const t = this.GoodsTypesData.find(x => x.id === this.temporarySelectedGoodType);
      if (t?.parentGoodsTypeId === null){ // dipuncak
        const a = this.GoodsTypesData.filter(y => y.parentGoodsTypeId === null);
        this.GoodsTypes$ = Array.from(a);
        this.temporarySelectedGoodType = null;
      }else{
        const t2 = this.GoodsTypesData.find(x => x.id === t?.parentGoodsTypeId);
        this.temporarySelectedGoodType = t2?.id;
        if (t2?.subGoodsTypes !== null && t2?.subGoodsTypes !== undefined && t2.subGoodsTypes.length > 0){
          const temp2 = this.GoodsTypesData.find(x => x.id === this.temporarySelectedGoodType);
          const a = t2?.subGoodsTypes;
          this.GoodsTypes$ = Array.from(a);
          if (temp2?.subGoodsTypes !== null && temp2?.subGoodsTypes !== undefined){
            this.GoodsTypes$.unshift(temp2);
          }
          this.GoodsTypes$.push(this.goodTypeBack);
          this.GoodsTypes$.push(this.goodTypeReset);
        }
      }
      this.GoodsTypeIdProduct?.setValue(this.temporarySelectedGoodType);
      setTimeout(() => {
        this.selectGoodType.open();
      }, 100);
    }
    else if (v === this.goodTypeReset.id){
      const a = this.GoodsTypesData.filter(y => y.parentGoodsTypeId === null);
      this.GoodsTypes$ = Array.from(a);
      this.temporarySelectedGoodType = null;
      this.GoodsTypeIdProduct?.setValue(this.temporarySelectedGoodType);
      setTimeout(() => {
        this.selectGoodType.open();
      }, 100);
    }
    else if (temp?.subGoodsTypes !== null && temp?.subGoodsTypes !== undefined && temp.subGoodsTypes.length > 0){
      this.temporarySelectedGoodType = v;
      const a = temp?.subGoodsTypes;
      this.GoodsTypes$ = Array.from(a);
      this.GoodsTypes$.unshift(temp);
      this.GoodsTypes$.push(this.goodTypeBack);
      this.GoodsTypes$.push(this.goodTypeReset);
      setTimeout(() => {
        this.selectGoodType.open();
      }, 100);
    }
    this.GoodsTypeIdProduct?.updateValueAndValidity();
  }
  openDialogGroup(): void{
    this.dialog.open(GroupProductKuDialogComponent,
      {data: this.tempSelectedGoodsGroup, hasBackdrop: true, maxWidth: '480px', width: '80%', disableClose: true })
    .afterClosed().subscribe((res: MyGoodsGroupsListItemDto[]) => {
      res = res.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.tempSelectedGoodsGroup = res;
      if (this.GoodsGroupProduct.value.length > 0){
        this.GoodsGroupProduct.value.clear();
      }
      res.map(x => x.id).forEach(x => this.GoodsGroupProduct.value.push(this.fb.control(x)));
    });
  }
  removeGroup(id: string): void{
    const idx = this.tempSelectedGoodsGroup.findIndex(x => x.id === id);
    this.tempSelectedGoodsGroup.splice(idx, 1);
    // const idx2 = this.GoodsGroupProduct.controls.findIndex(x => x.value === id);
    this.GoodsGroupProduct.value.removeAt(idx);
  }
  showGroupMemberDialog(id: string): void{
    const temp = this.tempSelectedGoodsGroup.find(x => x.id === id);
    this.dialog.open(MemberGroupProductKuDialogComponent,
      {
        data: temp && temp.members.length > 0 ? temp.members : [],
        maxWidth: '480px',
        width: '80%',
        disableClose: true
      })
      .afterClosed().subscribe();
  }
  addWholesaleprice():void{
    console.log(this.WholesalesPricesProduct);
    
    this.WholesalesPricesProduct.value.push(this.fb.group({
      WholesalerPrice: [0, [Validators.required]],
      WholesalerMin: [1, [Validators.required, Validators.min(1)]],
    }));
  }
  deleteWholesaleprice(idx:number):void{
    this.WholesalesPricesProduct.value.removeAt(idx);
  }
}
