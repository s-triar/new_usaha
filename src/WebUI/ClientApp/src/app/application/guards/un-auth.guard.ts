import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { GLOBAL_PATH } from '../constant/routes';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated$
      .pipe(
        map(x => !x),
        tap(x => console.log('You tried to go to ' + state.url + ' and this guard said ' + x)),
        tap(x => {
          if (!x){ this.router.navigate([GLOBAL_PATH.MAIN_HOME]); }
        })
      );
  }

}
