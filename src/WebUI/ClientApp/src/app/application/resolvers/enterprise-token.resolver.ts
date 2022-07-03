import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EnterpriseTokenDto } from 'src/app/domain/backend/Dtos';
import { EnterpriseTokenService } from 'src/app/infrastructure/backend/enterprise-token.service';
import { EnterpriseService } from 'src/app/infrastructure/backend/enterprise.service';
import { WORKSPACE_ROUTE } from '../constant/routes';



@Injectable({
  providedIn: 'root'
})

export class EnterpriseTokenResolver implements Resolve<void> {

  constructor(
    private readonly enterpriseService: EnterpriseService,
    private readonly enterpriseTokenService: EnterpriseTokenService
    ){}

  resolve(routes: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const p = routes.firstChild;
    const id =  p?.params[WORKSPACE_ROUTE._ID_USAHA.substring(1)]; // === DASHBOARD_ROUTE._ID_USAHA
    this.enterpriseService.getEnterpriseToken({EnterpriseId: id})
                          .subscribe((x: EnterpriseTokenDto) => {
                            this.enterpriseTokenService.setItem(x.token);
                          });
  }
}
