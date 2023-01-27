import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PopUpLoadingComponent } from './pop-up-loading.component';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PopUpLoadingService {
  private state$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dialogRef!: MatDialogRef<PopUpLoadingComponent>;

  constructor(private dialog: MatDialog) {}
  getState():Observable<boolean>{
    return this.state$.asObservable();
  }
  setState(state:boolean):void{
    this.state$.next(state);
  }
  show(): MatDialogRef<PopUpLoadingComponent> {
    this.dialogRef = this.dialog.open(PopUpLoadingComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  }
  close(): void {
    this.dialogRef.close();
  }
}
