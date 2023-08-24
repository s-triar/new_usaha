import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailOrderDto } from 'src/app/domain/backend/Dtos';
import { TransactionService } from 'src/app/infrastructure/backend/transaction.service';
import { DASHBOARD_ROUTE, DB_TRANS_ROUTE } from '../constant/routes';


@Injectable({
  providedIn: 'root'
})
export class DetailTransactionResolver  {
  constructor(
    private transactionService: TransactionService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DetailOrderDto> {
    // console.log(route.params);
    const idEnterprise = route.parent?.parent?.parent?.params[DASHBOARD_ROUTE._ID_USAHA.substr(1)];
    const idOrder =  route.params[DB_TRANS_ROUTE._ID_ORDER.substr(1)];
    // console.log(idEnterprise, idOrder);
    return this.transactionService.getDetailEnterpriseTransaction({Id: idOrder});

  }
}
