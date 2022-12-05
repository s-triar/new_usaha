import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth-jwt/auth.service';
import { GLOBAL_PATH } from '../constant/routes';


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
    const logged = this.authService.checkLoggedInd();
    console.log(logged, "auth un gurad");
    if(logged===true){
      this.router.navigate([GLOBAL_PATH.MAIN_HOME]);
      return false;
    }
    return true;
  }

}
