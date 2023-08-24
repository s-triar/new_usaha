import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { DataAddBusiness } from 'src/app/core/types';



@Component({
  selector: 'app-add-business-dialog',
  templateUrl: './add-business-dialog.component.html',
  styleUrls: ['./add-business-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatButtonModule
  ]
})
export class AddBusinessDialogComponent implements OnInit {
  data!: DataAddBusiness[] ;

  constructor(public dialogRef: MatDialogRef<AddBusinessDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: DataAddBusiness[]) {
    this.data = data;
  }

  ngOnInit(): void {
  }

  go(link: string): void{
    this.dialogRef.close(link);
  }

}
