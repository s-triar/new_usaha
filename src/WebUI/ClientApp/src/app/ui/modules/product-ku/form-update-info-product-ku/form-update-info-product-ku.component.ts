import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelect as MatSelect, MatLegacySelectChange as MatSelectChange, MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, of, throwIfEmpty, filter, Observable, shareReplay, startWith, map, tap } from 'rxjs';
import { PRODUCT_DEFAULT } from 'src/app/core/constant';
import { CustomUploadFileEventChange } from 'src/app/core/types';
import { InfoOfGoodsForUpdatingDto,  MyGoodsGroupsListItemDto, MyGoodsGroupsListMemberItemDto } from 'src/app/domain/backend/Dtos';
import { GoodsTypeDto, GoodsTypeService } from 'src/app/infrastructure/backend/goods-type.service';
import { ButtonUploadFileComponent } from 'src/app/ui/components/form/button-upload-file/button-upload-file.component';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { ScannerDialogComponent } from 'src/app/ui/components/pop-up/scanner-dialog/scanner-dialog.component';
import { GroupProductKuDialogComponent } from '../group-product-ku-dialog/group-product-ku-dialog.component';
import { MemberGroupProductKuDialogComponent } from '../member-group-product-ku-dialog/member-group-product-ku-dialog.component';
import { MyGoodsService } from '../services/my-goods.service';

@UntilDestroy()
@Component({
  selector: 'app-form-update-info-product-ku',
  templateUrl: './form-update-info-product-ku.component.html',
  styleUrls: ['./form-update-info-product-ku.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    ButtonUploadFileComponent,
    MatCheckboxModule
  ],
  providers:[
    MyGoodsService
  ]
})
export class FormUpdateInfoProductKuComponent implements OnInit {
  @Input() idUsaha!: string;
  @Input() dataGoods!: InfoOfGoodsForUpdatingDto;
  @Output() Submitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() Canceled: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('selectGoodType', { static: true }) selectGoodType!: MatSelect;
  defaultImg: string = PRODUCT_DEFAULT;
  url: string | null | ArrayBuffer = null;
  urlImg: string | null | ArrayBuffer = null;
  GoodsTypes$Lama!: GoodsTypeDto[] | null | undefined;
  GoodsTypes$!: GoodsTypeDto[];
  GoodsTypesData!: GoodsTypeDto[];
  goodTypeReset: GoodsTypeDto = {
    id: -1,
    name: 'Reset',
    parentGoodsTypeId: null,
    subGoodsTypes: null,
  };
  goodTypeBack: GoodsTypeDto = {
    id: -2,
    name: 'Kembali ke sebelumnya',
    parentGoodsTypeId: null,
    subGoodsTypes: null,
  };
  temporarySelectedGoodType!: number | null | undefined;
  tempSelectedGoodsGroup: MyGoodsGroupsListItemDto[] = [];
  form: FormGroup = this.fb.group({
    Id: [null, [Validators.required]],
    // Barcode: [
    //   null,
    //   [Validators.required, Validators.maxLength(255)],
    //   [ DuplicateBarcodeValidator.validate(this.goodsService)]
    // ],
    Name: [null, [Validators.required, Validators.maxLength(255)]],
    Description: [null],
    Photo: [null],
    PhotoFile: [null],
    PhotoString: [null],
    GoodsTypeId: [null, [Validators.required]],
    Contain: [1, [Validators.required, Validators.min(1)]],
    AvailableOnline: this.fb.nonNullable.control(false),
    IsWholesalerPriceAuto: this.fb.nonNullable.control(false),
    ParentBarcode: [null, [Validators.maxLength(255)]],
    // GoodsGroups: [this.fb.array([])],
    AddGoodsGroups: [this.fb.array([])],
    RemoveGoodsGroups: [this.fb.array([])]
  });
  get NameProduct(): AbstractControl | null {
    return this.form.get('Name');
  }
  get DescriptionProduct(): AbstractControl | null {
    return this.form.get('Description');
  }
  get BarcodeProduct(): AbstractControl | null {
    return this.form.get('Barcode');
  }
  get ContainProduct(): AbstractControl | null {
    return this.form.get('Contain');
  }
  get AvailableOnlineProduct(): AbstractControl | null {
    return this.form.get('AvailableOnline');
  }
  get PhotoProduct(): AbstractControl | null {
    return this.form.get('Photo');
  }
  get PhotoFileProduct(): AbstractControl | null {
    return this.form.get('PhotoFile');
  }
  get PhotoStringProduct(): AbstractControl | null {
    return this.form.get('PhotoString');
  }
  get GoodsTypeIdProduct(): AbstractControl | null {
    return this.form.get('GoodsTypeId');
  }
  get ParentBarcodeProduct(): AbstractControl | null {
    return this.form.get('ParentBarcode');
  }
  get AddGoodsGroupProduct(): FormArray {
    return this.form.controls.AddGoodsGroups as FormArray;
  }
  get RemoveGoodsGroups(): FormArray {
    return this.form.controls.RemoveGoodsGroups as FormArray;
  }
  goodTypesOptions$:Observable<GoodsTypeDto[]>; 

  constructor(
    private fb: FormBuilder,
    private readonly goodsService: MyGoodsService,
    private readonly goodsTypeService: GoodsTypeService,
    private dialog: MatDialog,
    private notifService: PopUpNotifService
  ) {}

  ngOnInit(): void {
    console.log(this.dataGoods);
    this.initForm();
    this.goodTypesOptions$ = this.GoodsTypeIdProduct.valueChanges.pipe(shareReplay({bufferSize:1, refCount:true})).pipe(
      startWith(this.dataGoods.goodsTypeId),
      tap(x=>console.log(x)),
      switchMap((x) => {

        if(!this.GoodsTypeIdProduct.dirty){
          return this.goodsTypeService.getItemForUpdate(x).pipe(
            tap((xx) => (this.goodTypeBack.parentGoodsTypeId = xx[0].parentGoodsTypeId)),
            map((xx) => {
              if (!xx.every((y) => y.parentGoodsTypeId === null)) {
                xx.push(this.goodTypeBack);
                xx.push(this.goodTypeReset);
              }
              return xx;
            })
          );
        }

        else if (x === this.goodTypeReset.id || x===null || x===0) {
          console.log("ke root");
          return this.goodsTypeService.getRoot();
        } else if (x === this.goodTypeBack.id) {
          console.log("ke parent");
          return this.goodsTypeService.getParent(x).pipe(
            tap((xx) => (this.goodTypeBack.parentGoodsTypeId = x)),
            map((xx) => {
              if (!xx.every((y) => y.parentGoodsTypeId === null)) {
                xx.push(this.goodTypeBack);
                xx.push(this.goodTypeReset);
              }
              return xx;
            })
          );
        } else {
          console.log("ke children");
          return this.goodsTypeService.getChildren(x).pipe(
            tap((xx) => (this.goodTypeBack.parentGoodsTypeId = x)),
            map((xx) => {
              xx.push(this.goodTypeBack);
              xx.push(this.goodTypeReset);
              return xx;
            })
          );
        }
      }),
      tap(x=>{
        if(this.GoodsTypeIdProduct.dirty){
          setTimeout(()=>{
            this.selectGoodType.open();
          },200)
        }
      })
    );
  }
  cancel(): void {
    this.Canceled.emit();
  }
  submit(): void {
    if (!this.form.valid) {
      this.notifService
        .show({
          title: 'Form Tidak Valid',
          message:
            'Harap isi form dengan benar. Pastikan tidak ada peringatan.',
          type: 'warning',
        })
        .afterClosed()
        .subscribe();
      return;
    }
    const temp = this.form.value;
    temp.AddGoodsGroups = this.AddGoodsGroupProduct.value.value ?? [];
    temp.RemoveGoodsGroups = this.RemoveGoodsGroups.value.value ?? [];
    console.log(temp);
    this.goodsService
      .update(temp)
      .pipe(
        untilDestroyed(this),
        switchMap((x) =>
          this.notifService
            .show({
              message: "Sukses memperbarui info produk",
              title: 'Sukses',
              type: 'success',
            })
            .afterClosed()
            .pipe(switchMap((y) => of(x)))
        )
      )
      .subscribe(() => this.Submitted.emit());
  }
  initForm(): void {
    this.form = this.fb.group({
      Id: [this.dataGoods.id, [Validators.required]],
      Name: [
        this.dataGoods.name,
        [Validators.required, Validators.maxLength(255)],
      ],
      Description: [this.dataGoods.description],
      Photo: [null],
      PhotoFile: [null],
      PhotoString: [null],
      GoodsTypeId: [this.dataGoods.goodsTypeId, [Validators.required]],
      Contain: [
        this.dataGoods.contain,
        [Validators.required, Validators.min(1)],
      ],
      AvailableOnline: this.fb.nonNullable.control(this.dataGoods.availableOnline),
      IsWholesalerPriceAuto: this.fb.nonNullable.control(this.dataGoods.isWholesalerPriceAuto),
      ParentBarcode: [
        this.dataGoods.parent?.barcode,
        [Validators.maxLength(255)],
      ],
      AddGoodsGroups: [this.fb.array([])],
      RemoveGoodsGroups: [this.fb.array([])]
    });

    this.tempSelectedGoodsGroup = this.dataGoods.groups.map((x) => {
      const r: MyGoodsGroupsListItemDto = {
        id: x.id,
        name: x.name,
        members: x.members.map((y) => {
          const s: MyGoodsGroupsListMemberItemDto = {
            id: y.id,
            name: y.name,
            photoUrl: null,
          };
          return s;
        }),
      };
      return r;
    });
  }
  resetForm(): void {
    this.initForm();
  }
  openScanner(): void {
    this.dialog
      .open(ScannerDialogComponent, {
        hasBackdrop: true,
        width: '480px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((x) => {
        this.BarcodeProduct?.setValue(null);
        if (x !== undefined) {
          this.BarcodeProduct?.setValue(x);
        }
        this.BarcodeProduct?.updateValueAndValidity();
      });
  }
  changed(event: CustomUploadFileEventChange): void {
    if (event.file !== null) {
      this.url = event.dataFile;
      this.form.patchValue({
        PhotoString: event.dataFile,
        PhotoFile: event.file,
        Photo: event.file?.name,
      });
      this.PhotoProduct?.updateValueAndValidity();
      this.PhotoFileProduct?.updateValueAndValidity();
      this.PhotoStringProduct?.updateValueAndValidity();
    }
  }
  selectGoodsType(event: MatSelectChange): void {
    const val = event.value as string;
    const v = parseInt(val, 10);
    this.changeGoodsType(v);
  }
  changeGoodsType(v: number): void {
    const temp = this.GoodsTypesData.find((x) => x.id === v);
    // let tempArr: GoodsTypeDto[] = [];
    if (v === this.goodTypeBack.id) {
      const t = this.GoodsTypesData.find(
        (x) => x.id === this.temporarySelectedGoodType
      );
      if (t?.parentGoodsTypeId === null) {
        // dipuncak
        const a = this.GoodsTypesData.filter(
          (y) => y.parentGoodsTypeId === null
        );
        this.GoodsTypes$ = Array.from(a);
        this.temporarySelectedGoodType = null;
      } else {
        const t2 = this.GoodsTypesData.find(
          (x) => x.id === t?.parentGoodsTypeId
        );
        this.temporarySelectedGoodType = t2?.id;
        if (
          t2?.subGoodsTypes !== null &&
          t2?.subGoodsTypes !== undefined &&
          t2.subGoodsTypes.length > 0
        ) {
          const temp2 = this.GoodsTypesData.find(
            (x) => x.id === this.temporarySelectedGoodType
          );
          const a = t2?.subGoodsTypes;
          this.GoodsTypes$ = Array.from(a);
          if (
            temp2?.subGoodsTypes !== null &&
            temp2?.subGoodsTypes !== undefined
          ) {
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
    } else if (v === this.goodTypeReset.id) {
      const a = this.GoodsTypesData.filter((y) => y.parentGoodsTypeId === null);
      this.GoodsTypes$ = Array.from(a);
      this.temporarySelectedGoodType = null;
      this.GoodsTypeIdProduct?.setValue(this.temporarySelectedGoodType);
      setTimeout(() => {
        this.selectGoodType.open();
      }, 100);
    } else if (
      temp?.subGoodsTypes !== null &&
      temp?.subGoodsTypes !== undefined &&
      temp.subGoodsTypes.length > 0
    ) {
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
  openDialogGroup(): void {
    this.dialog
      .open(GroupProductKuDialogComponent, {
        data: this.tempSelectedGoodsGroup,
        hasBackdrop: true,
        maxWidth: '480px',
        width: '80%',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: MyGoodsGroupsListItemDto[]) => {
        res = res.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        this.tempSelectedGoodsGroup = res;
        if (this.AddGoodsGroupProduct.value.length > 0) {
          this.AddGoodsGroupProduct.value.clear();
        }
        if (this.RemoveGoodsGroups.value.length > 0) {
          this.RemoveGoodsGroups.value.clear();
        }
        res
          .map((x) => x.id)
          .forEach((id) => {
            const idx = this.dataGoods.groups.findIndex((x) => x.id === id);
            if (idx === -1){
              this.AddGoodsGroupProduct.value.push(this.fb.control(id));
            }
          });
        this.dataGoods.groups
          .map((x) => x.id)
          .forEach(id => {
            const idx = res.findIndex((x) => x.id === id);
            if (idx === -1){
              this.RemoveGoodsGroups.value.push(this.fb.control(id));
            }
          });
        this.form.markAsDirty();
        this.form.updateValueAndValidity();
      });
  }
  removeGroup(id: string): void {
    const idx = this.dataGoods.groups.findIndex((x) => x.id === id);
    if (idx === -1){
      this.tempSelectedGoodsGroup.splice(idx, 1);
    }
    else{
      this.tempSelectedGoodsGroup.splice(idx, 1);
      this.RemoveGoodsGroups.value.push(this.fb.control(id));
    }
    // const idx2 = this.GoodsGroupProduct.controls.findIndex(x => x.value === id);
    // this.GoodsGroupProduct.value.removeAt(idx);
    this.form.markAsDirty();
    this.form.updateValueAndValidity();
  }
  showGroupMemberDialog(id: string): void {
    const temp = this.tempSelectedGoodsGroup.find((x) => x.id === id);
    this.dialog
      .open(MemberGroupProductKuDialogComponent, {
        data: temp && temp.members.length > 0 ? temp.members : [],
        maxWidth: '480px',
        width: '80%',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((x) => {

      });
  }
}
