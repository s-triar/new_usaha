import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  catchError,
  filter,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/core/auth-jwt/auth.service';
import { GLOBAL_PATH } from 'src/app/core/constant/routes';

import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PopUpLoadingService } from 'src/app/ui/components/pop-up/pop-up-loading/pop-up-loading.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    PortalContainerComponent,
    NavPageComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  pathToRegister = GLOBAL_PATH.AUTH_REGISTER;
  form: FormGroup = this._fb.nonNullable.group({
    Identifier: this._fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Password: this._fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  submit_state$: Subject<boolean> = new Subject<boolean>();
  formMessage$: Observable<void> = this.submit_state$
    .pipe(shareReplay({ bufferSize: 1, refCount: true }))
    .pipe(
      tap((x) => {
        if (x === false) {
          this._loadingService.close();
        } else {
          this._loadingService.show();
        }
      }),
      filter((x) => x === true),
      switchMap(() => this._authService.login(this.form.value)),
      tap(() => this.submit_state$.next(false)),
      tap((lastPath) => {
        this._router.navigateByUrl(
          lastPath !== null ? lastPath : GLOBAL_PATH.MAIN_HOME,
          { replaceUrl: true }
        );
      }),
      switchMap(() =>
        this._notifService
          .show({
            title: 'Sukses',
            message: 'Berhasil masuk',
            type: 'success',
          })
          .afterClosed()
      ),
      map((x) => void 0),
      catchError((error, source) => {
        this.submit_state$.next(false);
        return source; // to make observable alive again. because observable die if fail
      })
    );
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _loadingService: PopUpLoadingService,
    private _notifService: PopUpNotifService
  ) {}

  submit(): void {
    if (this.form.valid) {
      this.submit_state$.next(true);
    }
  }
}
