import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from "@angular/forms";
import { PageTemplateComponent } from '../../templates/page-template/page-template.component';
import { LoginService } from './data-access/login.service';
import { LoginCommand } from 'src/app/apis/account-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/utilities/auth.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: '../auth.component.scss',
  providers:[
    LoginService
  ],
  host:{
    'class':'app-page-container-top-bottom'
  }
})
export class LoginComponent {
  private _loginService: LoginService = inject(LoginService);
  private _router: Router = inject(Router);

  // state
  stateSg = this._loginService.statusSgC

  displayPasswordSg = signal<boolean>(false);

  form: FormGroup<{
    Identifier: FormControl<string>;
    Password: FormControl<string>;
  }> = this.fb.group({
    Identifier: ['', [Validators.required]],
    Password: ['', [Validators.required]],
  });

 
  constructor(private fb: NonNullableFormBuilder) {
    effect(()=>{
        if(this.stateSg() == 'Processing'){
          this.form.disable();
        }
        else{
          this.form.enable();
        }
    })


    this._loginService.userAuthenticated$.pipe(
      takeUntilDestroyed(),
    ).subscribe(
      (lastPath) => this._router.navigateByUrl(
        lastPath !== null ? lastPath : '',
        { replaceUrl: true }
      )
    )
  }

  submitForm(): void {
    if (this.form.valid && this.stateSg() != 'Processing') {
      this._loginService.login$.next(this.form.value as LoginCommand);
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
    this.displayPasswordSg.update((x)=>!x);
  }
}
