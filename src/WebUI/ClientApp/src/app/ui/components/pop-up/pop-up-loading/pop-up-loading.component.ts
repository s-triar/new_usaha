import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-pop-up-loading',
  standalone: true,
  templateUrl: './pop-up-loading.component.html',
  styleUrls: ['./pop-up-loading.component.scss'],
  imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule],
})
export class PopUpLoadingComponent {
  constructor(
    private dialogRef: MatDialogRef<PopUpLoadingComponent>,
  ){}
  
}
