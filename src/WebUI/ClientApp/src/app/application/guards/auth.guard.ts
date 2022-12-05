import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth-jwt/auth.service';
import { GLOBAL_PATH } from '../constant/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const logged = this.authService.checkLoggedInd();
      console.log(logged, "auth gurad");
      
      if(logged===false){
        this.router.navigate([GLOBAL_PATH.AUTH_LOGIN]);
        return false;
      }
      return true;
  }

}
