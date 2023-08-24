import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EnterpriseTokenService } from 'src/app/core/enterprise-jwt/enterprise-token.service';
import { WORKSPACE_ROUTE } from '../constant/routes';
import { EnterpriseAuthService, EnterpriseTokenResponseDto } from '../enterprise-jwt/enterprise-auth.service';



@Injectable({
  providedIn: 'root'
})

export class EnterpriseTokenResolver  {

  constructor(
    private readonly _myenterpriseService: EnterpriseAuthService,
    private readonly _enterpriseTokenService: EnterpriseTokenService
    ){}

  resolve(routes: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const p = routes.firstChild;
    const id =  routes?.params[WORKSPACE_ROUTE._ID_USAHA.substring(1)];
    this._myenterpriseService.getEnterpriseToken({EnterpriseId: id})
                          .subscribe((x: EnterpriseTokenResponseDto) => {
                            this._enterpriseTokenService.setItem(x.token);
                          });
  }
}
