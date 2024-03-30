import { Injectable, inject } from '@angular/core';
import { GetMyShopListSearchQuery, ShopApiService } from 'src/app/apis/shop-api.service';

@Injectable({
  providedIn: MyShopListService
})
export class MyShopListService {

  private _shopApiService: ShopApiService = inject(ShopApiService);

  constructor() { }

  getOwnedShop(data: GetMyShopListSearchQuery){
    return this._shopApiService.getOwned(data);
  }
}
