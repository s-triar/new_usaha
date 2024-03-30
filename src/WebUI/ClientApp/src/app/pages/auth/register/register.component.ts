import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from './data-access/register.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AccountApiService, RegisterCommand } from 'src/app/apis/account-api.service';
import { Router, RouterModule } from '@angular/router';
import { DuplicateUserEmailValidator } from 'src/app/pages/auth/register/validators/DuplicateUserEmailValidator';
import { DuplicateUserPhoneValidator } from 'src/app/pages/auth/register/validators/DuplicateUserPhoneValidator';
import { CheckMatchPasswordValidator } from './validators/MatchPasswordConfirmPasswordValidator';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { PageTemplateComponent } from '../../templates/page-template/page-template.component';
import { filter, map, merge, of, shareReplay, switchMap, tap } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    PageTemplateComponent,
    NzFormModule, 
    NzInputModule, 
    NzButtonModule, 
    ReactiveFormsModule, 
    NzInputModule,
    RouterModule,
    NzAlertModule,
    NzIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: '../auth.component.scss',
  providers:[
    RegisterService
  ],
  host:{
    'class':'app-page-container-top-bottom'
  }
})
export class RegisterComponent {
  private _registerService: RegisterService = inject(RegisterService);
  private _accountAPIService: AccountApiService = inject(AccountApiService);
  private _router: Router = inject(Router);

  // state
  stateSg = this._registerService.statusSgC
  displayPasswordSg = signal<boolean>(false);
  displayConfirmPasswordSg = signal<boolean>(false);

  form: FormGroup<{
    Fullname: FormControl<string>;
    Email: FormControl<string>;
    Phone: FormControl<string>;
    Password: FormControl<string>;
    ConfirmPassword: FormControl<string>;
  }> = this._fb.group(
    {
      Fullname: this._fb.control('', {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      Email: this._fb.control('', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(255),
        ],
        asyncValidators: [
          DuplicateUserEmailValidator.validate(this._accountAPIService),
        ],
      }),
      Phone: this._fb.control('', {
        validators: [Validators.required, Validators.maxLength(13)],
        asyncValidators: [
          DuplicateUserPhoneValidator.validate(this._accountAPIService),
        ],
      }),
      Password: this._fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      }),
      ConfirmPassword: this._fb.control('', {
        validators: [Validators.required],
      }),
    },
    {
      asyncValidators: [
        CheckMatchPasswordValidator.validate('Password', 'ConfirmPassword'),
      ],
    }
  );

 
  constructor(private _fb: NonNullableFormBuilder) {

    effect(()=>{
        if(this.stateSg() == 'Processing'){
          this.form.disable();
        }
        else{
          this.form.enable();
        }
    });

    this._registerService.userAuthenticated$.pipe(
      takeUntilDestroyed(),
    ).subscribe(
      () => this._router.navigateByUrl(
      '/auth/login'
      )
    )
  }

  submitForm(): void {
    if (this.form.valid && this.stateSg() != 'Processing') {
      this._registerService.register$.next(this.form.value as RegisterCommand);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  togglePassword():void{
    this.displayPasswordSg.update((x=>!x));
  }

  toggleConfirmPassword():void{
    this.displayConfirmPasswordSg.update((x=>!x));
  }
}
