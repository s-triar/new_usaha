import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { AuthService } from 'src/app/application/auth-jwt/auth.service';
import { delay, Observable, tap } from 'rxjs';
import { GLOBAL_PATH } from 'src/app/application/constant/routes';
import { Router, RouterModule } from '@angular/router';
import { CheckMatchPasswordValidator } from 'src/app/application/form-validators/MatchPasswordConfirmPasswordValidator';
import { DuplicateUserEmailValidator } from 'src/app/application/form-validators/DuplicateUserEmailValidator';
import { DuplicateUserPhoneValidator } from 'src/app/application/form-validators/DuplicateUserPhoneValidator';
import { AccountService } from 'src/app/application/auth-jwt/account.service';

@Component({
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  pathToLogin = GLOBAL_PATH.AUTH_LOGIN;
  loading = false;
  formMessage$: Observable<void>;

  form: FormGroup = this._fb.nonNullable.group({
    Fullname: this._fb.nonNullable.control('',{validators:[Validators.required, Validators.maxLength(255)]}),
    Email: this._fb.nonNullable.control('',{validators:[Validators.required, Validators.email,  Validators.maxLength(255)], asyncValidators:[DuplicateUserEmailValidator.validate(this._accService)]}),
    Phone: this._fb.nonNullable.control('',{validators:[Validators.required,  Validators.maxLength(13)], asyncValidators:[DuplicateUserPhoneValidator.validate(this._accService)]}),
    Password: this._fb.nonNullable.control('',{validators:[Validators.required,  Validators.minLength(6), Validators.maxLength(25)]}),
    ConfirmPassword: this._fb.nonNullable.control('',{validators:[Validators.required]}),
  }, {
    asyncValidators:[CheckMatchPasswordValidator.validate("Password","ConfirmPassword")]
  });

  constructor(
    private _fb: FormBuilder,
    private _authService:AuthService,
    private _accService:AccountService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(x=>{
      console.log(this.form.errors);
      
    });
  }
  register():void{
    this.formMessage$ = this._authService.register(this.form.value).pipe(
      delay(1000),
      tap(() => (this.loading = false)),
      tap(() => {
        this._router.navigateByUrl(GLOBAL_PATH.AUTH_LOGIN, {replaceUrl:true});
      })
    );
  }
  submit(): void{
    if(this.form.valid){
      this.loading = true;
      this.register();
    }
  }

}
