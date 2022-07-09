import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private oauthService:OAuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService
      .canActivateProtectedRoutes$
      // .isAuthenticated$
      .pipe(
        tap(x => console.log('You tried to go to ' + state.url + ' and this guard said ' + x)),
        switchMap(x=>of(this.oauthService.getAccessToken())),
        tap(x=>{
          console.log("dari auth guard");
          console.log(x);
          console.log(x!==null);
          
          
          
        }),
        map(x=>x!==null)
      );
  }

}
