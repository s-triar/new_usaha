import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { NotifDialogType, PopUpNotifComponent } from './pop-up-notif.component';

@Injectable({
  providedIn: 'root',
})
export class PopUpNotifService {

  dialogRef!: MatDialogRef<PopUpNotifComponent> ;
  constructor(private dialog: MatDialog) { }

  show(data: NotifDialogType): MatDialogRef<PopUpNotifComponent>{
    this.dialogRef = this.dialog.open(PopUpNotifComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  }
  close(): void{
    this.dialogRef.close();
  }
}
