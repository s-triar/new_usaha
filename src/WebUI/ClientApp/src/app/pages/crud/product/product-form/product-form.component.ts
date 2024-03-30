import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, FormsModule, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { map, Observable, Observer } from 'rxjs';
import { ProductApiService, GoodsGroupInfoDto } from 'src/app/apis/product-api.service';
import { ProductTypeApiService, ProductTypeDto } from 'src/app/apis/product-type-api.service';
import { PRODUCT_DEFAULT } from 'src/app/constants/app';
import { FileToBase64ConverterService } from 'src/app/utilities/file-to-base64-converter.service';
import { BarcodeProductAvailabilityValidator } from '../validators/BarcodeProductAvailabilityValidator';
import { ProductGroupFormComponent } from '../../product-group/product-group-form/product-group-form.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProductGroupNameApiService } from 'src/app/apis/product-group-name-api.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzUploadModule,
    NzStepsModule,
    NzAutocompleteModule,
    NzDividerModule,
    NgOptimizedImage,
    NzTreeSelectModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzListModule,
    NzSkeletonModule,
    ScrollingModule,
    NzModalModule,
    ProductGroupFormComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  private _productApiService: ProductApiService = inject(ProductApiService);
  private _productGroupNameApiService: ProductGroupNameApiService = inject(ProductGroupNameApiService);
  private _filebase64ConverterService: FileToBase64ConverterService = inject(FileToBase64ConverterService);
  private _productTypeApiService: ProductTypeApiService = inject(ProductTypeApiService);

   // state
   codeOptionsSg = signal<string[]>([]);
   productTypeOptionsSg = signal<NzTreeNodeOptions[]>([]);
   

   productGroupsSg = signal<GoodsGroupInfoDto[]>([]);
   productGroupModalShowingSg = signal<boolean>(false);


   fileList: NzUploadFile[] = [];
 
   previewImage: string = '';
   defaultPreviewImage = PRODUCT_DEFAULT;
   previewVisible = false;

   form: FormGroup<{
    Photo: FormGroup<{
      Photo: FormControl<null | string | ArrayBuffer>;
      PhotoFile: FormControl<null | File>;
    }>;
    Info: FormGroup<{
      Name: FormControl<string>;
      Barcode: FormControl<string>;
      ProductTypeId: FormControl<string>;
      Description: FormControl<string | null>;
      Contain: FormControl<number>;
      AvailableOnline: FormControl<boolean>;
      IsWholesalerPriceAuto: FormControl<boolean>;
      ParentBarcode: FormControl<string | null>;
      ProductGroups: FormArray<FormGroup<{
        Id: FormControl<string>;
        Name: FormControl<string>;
      }>>;
    }>;
    Pricing: FormGroup<{
      IsBuyPriceUsingGroup: FormControl<boolean>;
      BuyPrice: FormControl<number>;
      BuyPriceGroup: FormControl<string | null>;
      IsPriceUsingGroup: FormControl<boolean>;
      Price: FormControl<number>;
      PriceGroup: FormControl<string | null>;
      WholesalesPrices: FormArray<FormGroup<{
        WholesalerPrice: FormControl<number>;
        WholesalerMin: FormControl<number>;
      }>>;
    }>;
    Stock: FormGroup<{
      N: FormControl<number>;
      Threshold: FormControl<number>;
    }>;
  }> = this._fb.group({
    Photo: this._fb.nonNullable.group({
      Photo: this._fb.control<null | string | ArrayBuffer>(null),
      PhotoFile: this._fb.control<null | File>(null),
    }),
    Info: this._fb.nonNullable.group({
      Barcode: this._fb.nonNullable.control<string>(
        '',
        [Validators.required, Validators.maxLength(255)],
        [BarcodeProductAvailabilityValidator.validate(this._productApiService)],
      ),
      Name: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      Description: this._fb.control<string | null>(null, [
        Validators.maxLength(255),
      ]),
      ProductTypeId: this._fb.nonNullable.control<string>('', [
        Validators.required,
      ]),
      Contain: this._fb.nonNullable.control<number>(1, [Validators.required, Validators.min(1)]),
      AvailableOnline:this._fb.nonNullable.control<boolean>(true, [
        Validators.required,
      ]),
      IsWholesalerPriceAuto: this._fb.nonNullable.control<boolean>(false, [
        Validators.required,
      ]),
      ParentBarcode: this._fb.control<string | null>(null, [
        Validators.maxLength(255),
      ]),
      ProductGroups: this._fb.array<FormGroup<{
        Id: FormControl<string>;
        Name: FormControl<string>;
      }>>([]),
    }),
    Pricing: this._fb.group({
      IsBuyPriceUsingGroup: this._fb.nonNullable.control<boolean>(false),
      BuyPrice:  this._fb.nonNullable.control<number>(0, [
        Validators.required,
        Validators.min(0)
      ]),
      BuyPriceGroup: this._fb.control<string | null>(null, [
        Validators.maxLength(255),
      ]),
      IsPriceUsingGroup: this._fb.nonNullable.control<boolean>(false),
      Price: this._fb.nonNullable.control<number>(0, [
        Validators.required,
        Validators.min(0)
      ]),
      PriceGroup: this._fb.control<string | null>(null, [
        Validators.maxLength(255),
      ]),
      WholesalesPrices: this._fb.array<FormGroup<
      {
        WholesalerPrice: FormControl<number>;
        WholesalerMin: FormControl<number>;
      }
      >>([])
    }),
    Stock: this._fb.group({
      N: this._fb.nonNullable.control<number>(0, [
        Validators.required,
        Validators.min(0)
      ]),
      Threshold: this._fb.nonNullable.control<number>(0, [
        Validators.required,
        Validators.min(0)
      ]),
    }),
  });

  constructor() {
    this._productTypeApiService.getAll_Tree().pipe(
      takeUntilDestroyed(),
      map(x =>this.extract(x))
    ).subscribe(data => {
      this.productTypeOptionsSg.set(data)
    });

    this.form.valueChanges.subscribe(x=>console.log(x));
    
  }

  extract(data: ProductTypeDto[]): NzTreeNodeOptions[] {
    const temp: NzTreeNodeOptions[] = [];
    data.forEach(item => {
      temp.push({
        title: item.name,
        key: item.id.toString(),
        expanded: true,
        children: item.subProductTypes && item.subProductTypes.length > 0 ? this.extract(item.subProductTypes) : undefined,
        isLeaf: item.subProductTypes && item.subProductTypes.length > 0 ? false : true,
      });
    })
    return temp;
  }

  ngOnInit(): void {
    
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    let temp = null;
    if (!file.url) {
      temp = await this._filebase64ConverterService.getBase64(file.originFileObj!);
    }

    this.previewImage = file.url || temp;
    this.previewVisible = true;
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        // this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        // this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  handleChange(info: { file: NzUploadFile }): void {
    this.getBase64(info.file!.originFileObj!, (img: string) => {
      console.log(img);
      this.previewImage = img;
    });
    switch (info.file.status) {
      case 'uploading':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          console.log(img);
        });
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          console.log(img);
        });
        break;
      case 'error':


        break;
    }
  }

  submitForm(): void {
    if (this.form.valid) {

    }
  }

  toogleModalProductGroupName():void{
    this.productGroupModalShowingSg.update(()=>!this.productGroupModalShowingSg());
  }
  handleOk(): void {
    this.tambahGroup();
  }

  handleCancel(): void {
    this.toogleModalProductGroupName();
  }

  tambahGroup():void{
    // this.form.controls['Info'].controls['ProductGroups'].push(
    //   new FormGroup<{ Id: FormControl<string>; Name: FormControl<string>; }>({Id: 'sss', Name:'dsdd'})
    //   );

    const t: FormGroup<{ Id: FormControl<string>; Name: FormControl<string>; }> =  this._fb.group({
      Id:  this._fb.nonNullable.control<string>('dada'),
      Name:  this._fb.nonNullable.control<string>('dada')
    });
    this.form.controls['Info'].controls['ProductGroups'].push(t);

    const te: FormGroup<{ WholesalerPrice: FormControl<number>; WholesalerMin: FormControl<number>; }> =  this._fb.nonNullable.group({
      WholesalerPrice:  this._fb.nonNullable.control<number>(1000),
      WholesalerMin:  this._fb.nonNullable.control<number>(10)
    });
    this.form.controls['Pricing'].controls['WholesalesPrices'].push(te);
  }
}
