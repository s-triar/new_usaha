import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { NavPageComponent } from '../../components/nav/nav-page/nav-page.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    NavPageComponent,
    RouterModule
  ]
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
