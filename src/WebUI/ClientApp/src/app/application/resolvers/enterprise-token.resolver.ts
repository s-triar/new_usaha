import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EnterpriseTokenDto } from 'src/app/domain/backend/Dtos';
import { EnterpriseTokenService } from 'src/app/infrastructure/backend/enterprise-token.service';
import { MyEnterpriseService } from 'src/app/infrastructure/backend/my-enterprise.service';
import { WORKSPACE_ROUTE } from '../constant/routes';



@Injectable({
  providedIn: 'root'
})

export class EnterpriseTokenResolver implements Resolve<void> {

  constructor(
    private readonly _myenterpriseService: MyEnterpriseService,
    private readonly _enterpriseTokenService: EnterpriseTokenService
    ){}

  resolve(routes: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const p = routes.firstChild;
    // console.log(p);
    // console.log(routes);
    const id =  routes?.params[WORKSPACE_ROUTE._ID_USAHA.substring(1)]; // === DASHBOARD_ROUTE._ID_USAHA
    console.log("EnterpriseTokenResolver",id)
    this._myenterpriseService.getEnterpriseToken({EnterpriseId: id})
                          .subscribe((x: EnterpriseTokenDto) => {
                            this._enterpriseTokenService.setItem(x.token);
                          });
  }
}
