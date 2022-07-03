import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { EnterpriseRoleDetailDto } from 'src/app/domain/backend/Dtos';
import { RoleService } from 'src/app/infrastructure/backend/role.service';
import { DB_EMPY_ROLE_ROUTE } from '../constant/routes';

@Injectable({
  providedIn: 'root'
})
export class InfoRoleResolver implements Resolve<EnterpriseRoleDetailDto> {
  constructor(private roleService: RoleService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EnterpriseRoleDetailDto> {
    const idRole =  route.params[DB_EMPY_ROLE_ROUTE._ID_ROLE.substr(1)];
    console.log('idRole', idRole);
    return this.roleService.getEnterpriseRoleClaims({Id: idRole});
  }
}
