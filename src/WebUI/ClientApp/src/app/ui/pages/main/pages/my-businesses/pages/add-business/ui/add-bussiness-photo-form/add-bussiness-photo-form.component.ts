import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BUSINESS_DEFAULT } from 'src/app/core/constant';
import { CustomUploadFileEventChange } from 'src/app/core/types';
import { ButtonUploadFileComponent } from 'src/app/ui/components/form/button-upload-file/button-upload-file.component';

@Component({
  selector: 'app-add-bussiness-photo-form',
  standalone: true,
  templateUrl: './add-bussiness-photo-form.component.html',
  styleUrls: ['./add-bussiness-photo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule,ButtonUploadFileComponent],
})
export class AddBussinessPhotoFormComponent {
  @Input() form: FormGroup;
  defaulImg: string = BUSINESS_DEFAULT;
  url: string|null|ArrayBuffer = null;

  get Photo(): AbstractControl|null{
    return this.form.get('Photo');
  }
  get PhotoFile(): AbstractControl|null{
    return this.form.get('PhotoFile');
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
}
