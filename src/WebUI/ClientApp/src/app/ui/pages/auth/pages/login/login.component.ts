import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/application/auth/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    ) { }

  ngOnInit(): void {

  }
  logout(): void {
   this.authService.logout();

  }

  async login(): Promise<void> {
    this.authService.login();
  }



}
