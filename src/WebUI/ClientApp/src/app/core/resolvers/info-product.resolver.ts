import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable} from 'rxjs';
import { InfoOfGoodsForUpdatingDto } from 'src/app/domain/backend/Dtos';
import { MyGoodsService } from 'src/app/ui/modules/product-ku/services/my-goods.service';

import { WS_PRODUCT } from '../constant/routes';

@Injectable({
  providedIn: 'root',
})

export class InfoProductResolver implements Resolve<InfoOfGoodsForUpdatingDto> {

  constructor(private goodsService: MyGoodsService){}

  resolve(routes: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InfoOfGoodsForUpdatingDto> {
    const p = routes.params;
    const id =  p[WS_PRODUCT._ID_PRODUCT_INFO.substring(1)];
    return this.goodsService.getInfoGoodsForUpdate({Id: id});
  }
}
