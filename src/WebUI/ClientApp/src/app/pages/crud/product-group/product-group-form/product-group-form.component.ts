import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ProductGroupNameAvailabilityValidator } from '../product-group-validators/ProductGroupNameAvailabilityValidator';
import { ProductGroupNameApiService } from 'src/app/apis/product-group-name-api.service';

@Component({
  selector: 'app-product-group-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './product-group-form.component.html',
  styleUrl: './product-group-form.component.scss'
})
export class ProductGroupFormComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  private _productGroupNameApiService: ProductGroupNameApiService = inject(ProductGroupNameApiService);
  form: FormGroup<{
    Name: FormControl<string>;
    Description: FormControl<string|null>;
  }> = this._fb.group({
    Name: this._fb.nonNullable.control<string>(
      '',
      [Validators.required, Validators.maxLength(255)],
      [ProductGroupNameAvailabilityValidator.validate(this._productGroupNameApiService)]
    ),
    Description: this._fb.control<string | null>(
      null,
      [Validators.maxLength(255)],
    )
  });

  submitForm(): void {
    if (this.form.valid) {

    }
  }
}
