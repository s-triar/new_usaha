import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { AuthService } from 'src/app/core/auth-jwt/auth.service';
import {
  catchError,
  delay,
  filter,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { GLOBAL_PATH } from 'src/app/core/constant/routes';
import { Router, RouterModule } from '@angular/router';
import { CheckMatchPasswordValidator } from 'src/app/core/form-validators/MatchPasswordConfirmPasswordValidator';
import { DuplicateUserEmailValidator } from 'src/app/core/form-validators/DuplicateUserEmailValidator';
import { DuplicateUserPhoneValidator } from 'src/app/core/form-validators/DuplicateUserPhoneValidator';
import { AccountService } from 'src/app/infrastructure/backend/account.service';
import { PopUpLoadingService } from 'src/app/ui/components/pop-up/pop-up-loading/pop-up-loading.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';

@Component({
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
})
export class RegisterComponent {
  pathToLogin = GLOBAL_PATH.AUTH_LOGIN;
  submission_form$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup = this._fb.nonNullable.group(
    {
      Fullname: this._fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      Email: this._fb.nonNullable.control('', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(255),
        ],
        asyncValidators: [
          DuplicateUserEmailValidator.validate(this._accService),
        ],
      }),
      Phone: this._fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(13)],
        asyncValidators: [
          DuplicateUserPhoneValidator.validate(this._accService),
        ],
      }),
      Password: this._fb.nonNullable.control('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      }),
      ConfirmPassword: this._fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
    },
    {
      asyncValidators: [
      CheckMatchPasswordValidator.validate('Password', 'ConfirmPassword'),
      ],
    }
  );

  formMessage$: Observable<void> = this.submission_form$
    .asObservable()
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
      switchMap(() => this._authService.register(this.form.value)),
      tap(() => this.submission_form$.next(false)),
      
      tap(() => {
        this._router.navigateByUrl(GLOBAL_PATH.AUTH_LOGIN, {
          replaceUrl: true,
        });
      }),
      switchMap(() =>
        this._notifService
          .show({
            title: 'Sukses',
            message: 'Pendaftara pengguna baru berhasil',
            type: 'success',
          })
          .afterClosed()
      ),
      catchError((error, source) => {
        this.submission_form$.next(false);
        return source; // to make observable alive again. because observable die if fail
      })
    );

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _accService: AccountService,
    private _router: Router,
    private _loadingService: PopUpLoadingService,
    private _notifService: PopUpNotifService
  ) {}
  submit(): void {
    if (this.form.valid) {
      this.submission_form$.next(true);
    }
  }
}
