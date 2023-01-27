import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-bussiness-address-form',
  standalone: true,
  templateUrl: './add-bussiness-address-form.component.html',
  styleUrls: ['./add-bussiness-address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class AddBussinessAddressFormComponent {
  @Input() form: FormGroup;
  get AddressStreet(): AbstractControl|null{
    return this.form.get('Street');
  }
  get AddressSubDistrict(): AbstractControl|null{
    return this.form.get('SubDistrict');
  }
  get AddressDistrict(): AbstractControl|null{
    return this.form.get('District');
  }
  get AddressCity(): AbstractControl|null{
    return this.form.get('City');
  }
  get AddressProvince(): AbstractControl|null{
    return this.form.get('Province');
  }
  get AddressPostalCode(): AbstractControl|null{
    return this.form.get('PostalCode');
  }
  get AddressLatitude(): AbstractControl|null{
    return this.form.get('Latitude');
  }
  get AddressLongitude(): AbstractControl|null{
    return this.form.get('Longitude');
  }
}
