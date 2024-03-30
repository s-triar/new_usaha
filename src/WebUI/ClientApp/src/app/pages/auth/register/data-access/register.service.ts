import { Injectable, computed, inject, signal } from '@angular/core';
import { RegisterComponent } from '../register.component';
import { EMPTY, Observable, Subject, catchError, delay, filter, map, merge, shareReplay, switchMap } from 'rxjs';
import { AccountApiService, RegisterCommand } from 'src/app/apis/account-api.service';
import { ProcessStatus } from 'src/app/constants/app';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface RegisterState {
  status: ProcessStatus;
}

export interface RegisterServiceInterface {
}



@Injectable({
  providedIn: RegisterComponent
})
export class RegisterService implements RegisterServiceInterface{

  private _accountService: AccountApiService = inject(AccountApiService);

  // source
  error$ = new Subject<any>();
  register$ = new Subject<RegisterCommand>();
  userAuthenticated$ = this.register$.pipe(
    delay(2000),
    switchMap((data) =>
      this._accountService.registerAccount(data).pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  // state
  private stateSg = signal<RegisterState>({
    status: 'Idle',
  });

  // selectors
  statusSgC = computed(() => this.stateSg().status);


  constructor(
  ) {
    // reducers
    merge(
      this.register$.pipe(map(() => ({ status: 'Processing' as const }))),
      this.userAuthenticated$.pipe(map(() => ({ status: 'Success' as const }))),
      this.error$.pipe(map(() => ({ status: 'Error' as const })))
    ).pipe(
      takeUntilDestroyed(),
    ).subscribe(
      (x) => this.stateSg.set(x)
    )
  }

}
