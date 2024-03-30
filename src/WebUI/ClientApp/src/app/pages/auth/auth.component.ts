import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { PageTemplateComponent } from '../templates/page-template/page-template.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, PageTemplateComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  title = '';
  constructor(){
    this._router.events
    .pipe(
      takeUntilDestroyed(),
      filter(event => event instanceof NavigationEnd),
      switchMap(()=>this._activatedRoute.firstChild!.title),
    ).subscribe(x=>this.title=x ?? '')
  }
}
