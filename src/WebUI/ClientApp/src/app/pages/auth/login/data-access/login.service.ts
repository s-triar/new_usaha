import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LoginComponent } from '../login.component';
import { EMPTY, Subject, catchError, delay, filter, map, merge, shareReplay, switchMap, tap} from 'rxjs';
import { LocalStorageService } from 'src/app/utilities/local-storage.service';
import { AccountApiService, LoginCommand } from 'src/app/apis/account-api.service';
import { KEY_LAST_PATH, ProcessStatus } from 'src/app/constants/app';
import { KEY_ACCESS_TOKEN } from 'src/app/constants/auth';
import { AuthService } from 'src/app/utilities/auth.service';

export interface LoginState {
  status: ProcessStatus;
}

export interface LoginServiceInterface {

}


@Injectable({
  providedIn: LoginComponent
})
export class LoginService implements LoginServiceInterface {

  private _localstorage: LocalStorageService = inject(LocalStorageService);
  private _accountService: AccountApiService = inject(AccountApiService);
  private _authService: AuthService = inject(AuthService);

  // source
  error$ = new Subject<any>();
  login$ = new Subject<LoginCommand>();
  userAuthenticated$ = this.login$.pipe(
    delay(2000),
    switchMap((data) =>
      this._accountService.loginAccount(data).pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        filter((x) => !!x),
        tap((x) => this._localstorage.save(KEY_ACCESS_TOKEN, x.accessToken)),
        tap(() => this._authService.user_tokenSg.set(this._localstorage.load(KEY_ACCESS_TOKEN))),
        map(() => this._localstorage.pull(KEY_LAST_PATH)), 

        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  // state
  private stateSg = signal<LoginState>({
    status: 'Idle',
  });

  // selectors
  statusSgC = computed(() => this.stateSg().status);


  constructor(
  ) {
    // reducers
    merge(
      this.login$.pipe(map(() => ({ status: 'Processing' as const }))),
      this.userAuthenticated$.pipe(map(() => ({ status: 'Success' as const }))),
      this.error$.pipe(map(() => ({ status: 'Error' as const })))
    ).pipe(
      takeUntilDestroyed(),
    ).subscribe(
      (x) => this.stateSg.set(x)
    )
  }

}
