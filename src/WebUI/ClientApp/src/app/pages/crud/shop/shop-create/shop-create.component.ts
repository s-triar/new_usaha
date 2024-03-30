import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PageTemplateComponent } from 'src/app/pages/templates/page-template/page-template.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShopCodeAvailabilityValidator } from './validators/ShopCodeAvailabilityValidator';
import { ShopApiService } from 'src/app/apis/shop-api.service';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { AutocompleteDataSourceItem, NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Observable, Observer, map, of } from 'rxjs';
import { FileToBase64ConverterService } from 'src/app/utilities/file-to-base64-converter.service';
import { BUSINESS_DEFAULT } from 'src/app/constants/app';
import { ShopTypeApiService, ShopTypeDto } from 'src/app/apis/shop-type-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shop-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PageTemplateComponent,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzUploadModule,
    NzStepsModule,
    NzAutocompleteModule,
    NzDividerModule,
    NgOptimizedImage
  ],
  templateUrl: './shop-create.component.html',
  styleUrl: './shop-create.component.scss'
})
export class ShopCreateComponent implements OnInit {
  private _fb: FormBuilder = inject(FormBuilder);
  private _shopApiService: ShopApiService = inject(ShopApiService);
  private _filebase64ConverterService: FileToBase64ConverterService = inject(FileToBase64ConverterService);
  private _shopTypeApiService: ShopTypeApiService = inject(ShopTypeApiService);

  // state
  codeOptionsSg = signal<string[]>([]);
  shopTypeOptionsSg = signal<AutocompleteDataSourceItem[]>([]);
  fileList: NzUploadFile[] = [];

  previewImage: string = '';
  defaultPreviewImage = BUSINESS_DEFAULT;
  previewVisible = false;

  form: FormGroup<{
    Photo: FormGroup<{
      Photo: FormControl<null | string | ArrayBuffer>;
      PhotoFile: FormControl<null | File>;
    }>;
    Info: FormGroup<{
      Name: FormControl<string>;
      Code: FormControl<string>;
      Description: FormControl<null | string>;
      ShopTypeId: FormControl<string>;
      Phone: FormControl<string>;
      Email: FormControl<string>;
    }>;
    Address: FormGroup<{
      Street: FormControl<string>;
      SubDistrict: FormControl<string>;
      District: FormControl<string>;
      City: FormControl<string>;
      Province: FormControl<string>;
      PostalCode: FormControl<string>;
      Coordinate: FormGroup<{
        Latitude: FormControl<null | number>;
        Longitude: FormControl<null | number>;
      }>;

    }>;
  }> = this._fb.group({
    Photo: this._fb.nonNullable.group({
      Photo: this._fb.control<null | string | ArrayBuffer>(null),
      PhotoFile: this._fb.control<null | File>(null),
    }),
    Info: this._fb.nonNullable.group({
      Name: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      Code: this._fb.nonNullable.control<string>(
        '',
        [Validators.required, Validators.maxLength(255)],
        [
          ShopCodeAvailabilityValidator.validate(
            this._shopApiService
          ),
        ]
      ),
      Description: this._fb.control<string | null>(null, [
        Validators.maxLength(255),
      ]),
      ShopTypeId: this._fb.nonNullable.control<string>("1", [
        Validators.required,
      ]),
      Phone: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      Email: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
      ]),
    }),
    Address: this._fb.nonNullable.group({
      Street: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      SubDistrict: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      District: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      City: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      Province: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      PostalCode: this._fb.nonNullable.control<string>('', [
        Validators.required,
        Validators.maxLength(6),
      ]),
      Coordinate: this._fb.nonNullable.group({
        Latitude: this._fb.control<null | number>(null),
        Longitude: this._fb.control<null | number>(null),
      })
    }),
  });

  constructor() {
    this._shopTypeApiService.getAll().pipe(
      takeUntilDestroyed(),
      map(x => {
        const temp: AutocompleteDataSourceItem[] = [];
        x.forEach(item => {
          temp.push({
            label: item.name,
            value: item.id.toString()
          });
        })
        return temp;
      })
    ).subscribe(data => {
      this.shopTypeOptionsSg.set(data)
    })
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
}
