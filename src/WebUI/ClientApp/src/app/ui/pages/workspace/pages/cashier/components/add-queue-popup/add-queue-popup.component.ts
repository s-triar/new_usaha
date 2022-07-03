import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CashierDataService } from '../../services/cashier-data.service';
import { QueueKeyValidator } from '../../../../../../../application/form-validators/QueueKeyValidator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  templateUrl: './add-queue-popup.component.html',
  styleUrls: ['./add-queue-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddQueuePopupComponent implements OnInit {

  form = this.formBuilder.group({
    Key: [null, [Validators.required], [QueueKeyValidator.validate(this.cashierDataService)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddQueuePopupComponent>,
    private cashierDataService: CashierDataService
  ) { }

  ngOnInit(): void {
  }

  closeWithRandom(): void{
    this.dialogRef.close(true);
  }
  closeWithValue(): void{
    console.log('trigger', this.form.controls.Key.value);
    this.dialogRef.close(this.form.controls.Key.value);
  }
}
