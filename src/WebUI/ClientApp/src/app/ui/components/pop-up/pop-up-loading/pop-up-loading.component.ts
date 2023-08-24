import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
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
