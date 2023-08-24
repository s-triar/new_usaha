import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth-jwt/auth.service';
import { KEY_LAST_PATH } from '../constant';
import { GLOBAL_PATH } from '../constant/routes';
import { LocalStorageService } from '../utility/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _localStorage: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const logged = this.authService.checkLoggedInd();
    console.log(logged, 'auth gurad');

    if (logged === false) {
      this._localStorage.save(KEY_LAST_PATH, state.url);
      this.router.navigate([GLOBAL_PATH.AUTH_LOGIN]);
      return false;
    }
    return true;
  }
  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
  }
}
