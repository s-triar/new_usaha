import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Route, Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, delay, Observable, Subject, takeUntil, tap, timeout } from 'rxjs';
import {
  AuthService,
} from 'src/app/application/auth-jwt/auth.service';
import { GLOBAL_PATH } from 'src/app/application/constant/routes';
import { LocalStorageService } from 'src/app/application/utility/local-storage.service';

import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';

@UntilDestroy()
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
})
export class LoginComponent implements OnInit {
  pathToRegister = GLOBAL_PATH.AUTH_REGISTER;
  formMessage$: Observable<string>;
  loading: boolean = false;
  form: FormGroup = this._fb.nonNullable.group({
    Identifier: this._fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Password: this._fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe(x=>console.log(this.form.errors))
  }

  async login(): Promise<void> {
    this.formMessage$ = this._authService.login(this.form.value).pipe(
      delay(1000),
      tap(() => (this.loading = false)),
      tap(() => {
        const lastPath = this._localStorage.load('last_path');
        this._router.navigateByUrl(lastPath  !== null?lastPath: GLOBAL_PATH.MAIN_HOME, {replaceUrl:true});
      })
    );
  }

  submit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.login();
    }
  }
}
