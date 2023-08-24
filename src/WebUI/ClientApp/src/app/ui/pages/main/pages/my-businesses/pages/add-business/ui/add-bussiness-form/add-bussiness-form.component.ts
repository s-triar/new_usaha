import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonUploadFileComponent } from 'src/app/ui/components/form/button-upload-file/button-upload-file.component';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { EnterpriseTypeDto } from 'src/app/infrastructure/backend/enterprise-type.service';

@Component({
  selector: 'app-add-bussiness-form',
  standalone: true,
  templateUrl: './add-bussiness-form.component.html',
  styleUrls: ['./add-bussiness-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ButtonUploadFileComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
  ],
})
export class AddBussinessFormComponent {
 @Input() form:FormGroup;
 @Input() enterpriseTypes:EnterpriseTypeDto[];
 @Input() codes: string[] = [];


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

get Phone(): AbstractControl|null{
  return this.form.get('Phone');
}
get Email(): AbstractControl|null{
  return this.form.get('Email');
}

}
