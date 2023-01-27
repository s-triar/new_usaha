import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QueueKeyValidator } from 'src/app/core/form-validators/QueueKeyValidator';
import { AddQueuePopupComponent } from '../../../cashier/components/add-queue-popup/add-queue-popup.component';
import { CashierDataService } from '../../../cashier/services/cashier-data.service';

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
  ]
})
export class QueueComponent {
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
    this.dialogRef.close(this.form.controls.Key.value);
  }
}
