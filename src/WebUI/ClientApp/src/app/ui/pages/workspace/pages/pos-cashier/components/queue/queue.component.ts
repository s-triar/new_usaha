import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { QueueKeyValidator } from 'src/app/core/form-validators/QueueKeyValidator';
import { PosCashierDataService } from '../../services/pos-cashier-data.service';


@Component({
  selector: 'app-queue',
  standalone: true,
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  
})
export class QueueComponent {
  form = this.formBuilder.group({
    Key: [null, [Validators.required], [QueueKeyValidator.validate(this.cashierDataService)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<QueueComponent>,
    private cashierDataService: PosCashierDataService
  ) { }

  ngOnInit(): void {
  }

  closeWithRandom(): void{
    this.dialogRef.close(true);
  }
  closeWithValue(): void{
    this.dialogRef.close(this.form.controls.Key.value);
  }
}
