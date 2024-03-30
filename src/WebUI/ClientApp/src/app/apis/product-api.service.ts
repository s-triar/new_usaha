import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormValueToFormDataConverterService } from '../utilities/form-value-to-form-data-converter.service';

export type WholesalesPrice = {
  WholesalerPrice: number;
  WholesalerMin: number;
}

export type AdjustStockCommand = {
  Id: string,
  ActualStock: number,
};
export type AddStockCommand = {
  Id: string,
  Increment: number,
  BuyPriceTotal: number,
};
export type UpdateGoodsSellingPriceCommand = {
  Id: string,
  Price: number,
  WholesalerPrices: WholesalesPrice[],
};

export type CreateGoodsCommand = {
  GoodsTypeId: number;
  Barcode: string;
  Name: string;
  Description: string;
  Photo: string;
  PhotoFile: File | null;
  PhotoString: string | ArrayBuffer | null;
  Contain: number;
  Price: number;
  N: number;
  Threshold: number;
  AvailableOnline: boolean;
  BuyPrice: number;
  WholesalesPrices: WholesalesPrice[];
  IsWholesalerPriceAuto: boolean;
  ParentBarcode: string;
  GoodsGroups: string[];
};

export type EditGoodsCommand = {
  Id: string;
  GoodsTypeId: number;
  Barcode: string;
  Name: string;
  Description: string;
  Photo: string;
  PhotoFile: File | null;
  PhotoString: string | ArrayBuffer | null;
  Contain: number;
  AvailableOnline: boolean;
  ParentBarcode: string;
  AddGoodsGroups: string[];
  RemoveGoodsGroups: string[];
};



export type MyGoodsRelationDto = {
  id: string;
  name: string;
};

export type MyGoodsesListItemDto = {
  id: string;
  goodsInfoId: string;
  enterpriseId: string;
  barcode: string;
  name: string;
  goodsPackaging: string;
  price: number;
  stock: string;
};

export type SearchPageResponse<T> = {
  items: T[],
  totalPages: number,
  totalCount: number,
  pageNumber: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean
};

export type MyGoodsesListContainerDto = SearchPageResponse<MyGoodsesListItemDto> & {

};

export type MyGoodsesDto = {
  id: string;
  enterpriseId: string;
  barcode: string;
  name: string;
  description: string;
  photo: string;
  goodsType: string;
  goodsPackaging: string;
  contain: number;
  price: number;
  wholesalerPrice: number;
  n: number;
  stock: string;
};
export type GoodsGroupInfoDto = {
  id: string;
  members: GoodsGroupMemberInfoDto[];
  name: string;
};
export type GoodsGroupMemberInfoDto = {
  id: string;
  barcode: string;
  name: string;
};
export type GoodsParentInfoDto = {
  id: string;
  barcode: string;
  name: string;
  description: string;
  photo: string;
  contain: number;
  n: number;
};

export type WholesalespriceDto = {
  wholesalerPrice: number;
  wholesalerMin: number;
  id: string;

}

export type InfoOfGoodsForUpdatingDto = {
  id: string;
  enterpriseId: string;
  name: string;
  description: string;
  goodsTypeId: number;
  barcode: string;
  photo: string;
  contain: number;
  n: number;
  price: number;
  buyPrice: number;
  baseBuyPrice: number;
  isWholesalerPriceAuto: boolean;
  parentGoodsId: string;
  availableOnline: boolean;
  threshold: number;
  parent: GoodsParentInfoDto | null;
  groups: GoodsGroupInfoDto[];
  wholePrices: WholesalespriceDto[];
};

export type MyGoodsForCashierDto = {
  id: string;
  enterpriseId: string;
  barcode: string;
  name: string;
  price: number;
  wholessalePrices: WholesalespriceDto[];
  promos: any[];
  isWholesalerPriceAuto: boolean;
  goodsPackaging: string;
};

export type TransactionListContainerDto = SearchPageResponse<OrderDto> & {

};

export type OrderDto = {
  id: string;
  total: number;
  payment: number;
  return: number;
  orderProgress: string;
  paymentMethod: string;
  isOnline: boolean;
  createdAt: Date;
};

export type OrderProgressList = {
  id: string;
  createdAt: Date;
  name: string;
};

export type OrderGoodsList = {
  id: string;
  barcode: string;
  name: string;
  isWholesalerPrice: boolean;
  discountItem: number;
  discountItemTotal: number;
  pricePerItem: number;
  pricePerItemAfterDiscount: number;
  priceTotal: number;
  priceTotalAfterDiscount: number;
  priceTotalFinal: number;
  n: number;
};

export type DetailOrderDto = {
  id: string;
  total: number;
  payment: number;
  return: number;
  orderProgress: string;
  paymentMethodName: string;
  isOnline: boolean;
  createdAt: Date;
  orderProgresses: OrderProgressList[];
  goodsOrdereds: OrderGoodsList[]
  to: string;
  createdById: string;
  createdByName: string;

};

export type EnterpriseClaimDto = {
  id: string;
  context: string;
  feature: string;
  action: string;
  description: string;
};
export type EnterpriseRoleDetailDto = {
  id: string;
  name: string;
  claims: string[];
};

export type EnterpriseRoleDto = {
  id: string;
  name: string;
};

export type EnterpriseRoleContainerDto = SearchPageResponse<EnterpriseRoleDto> & {

};


export type MyGoodsGroupsListMemberItemDto = {
  id: string;
  name: string;
  photoUrl: string | null;
};

export type MyGoodsGroupsListItemDto = {
  id: string;
  name: string;
  members: MyGoodsGroupsListMemberItemDto[];
};

export type MyGoodsGroupsListContainerDto = SearchPageResponse<MyGoodsGroupsListItemDto> & {

};




export enum DiagramRangeSellPriceType {
  PRICE = 1,
  CHANGE = 2,
};

export type ResultSellPriceLineDiagramItem =
  {
    dateTime: Date;
    price: number;
  };

export type ResultSellPriceLineDiagram =
  {
    type: DiagramRangeSellPriceType;
    items: ResultSellPriceLineDiagramItem[];
    average: number;
  }

export enum DiagramRangeBuyPriceType {
  PRICE = 1,
  CHANGE = 2,
}
export type ResultBuyPriceLineDiagramItem =
  {
    dateTime: Date;
    price: number;

  };

export type ResultBuyPriceLineDiagram = {
  type: DiagramRangeBuyPriceType;
  items: ResultBuyPriceLineDiagramItem[];
  average: number;
}

export enum DiagramRangeSoldType {
  SUM = 1,
  AVERAGE = 2,
  MAX = 3,
  MIN = 4
};

export type ResultSoldLineDiagramItem =
  {
    dateTime: Date;
    n: number;
  }

export type ResultSoldLineDiagram = {
  type: DiagramRangeSoldType;
  items: ResultSoldLineDiagramItem[];
  average: number;
}

export type CheckAvailableEnterpriseCodeQuery = {
  Code: string
};

export type GetMyEnterprisesSearchQuery = SearchPageRequest & {

};
export type GetAvailableEnterpriseCodeQuery = {
  Name: string
};
export type CheckDuplicateBarcodeInAnEnterpriseQuery = {
  Barcode: string;
};
export type SearchPageRequest = {
  Search: string;
  PageNumber: number;
  PageSize: number;
};
export type GetMyEnterprisesQuery = SearchPageRequest & {

};
export type GetMyGoodsesSearchQuery = SearchPageRequest & {

};

export type GetMyGoodsesRelationQuery = {
  EnterpriseId: string;
  Search: string;
};
export type GetInfoOfGoodsForUpdatingQuery = {
  Id: string
};
export type CashierProductSearchQuery = {
  Search: string;
  EnterpriseId: string;
};

export type SellPriceChangeInARangeQuery = {
  Id: string;
  Year: number;
  Type: DiagramRangeSellPriceType;
}

export type BuyPriceChangeInARangeQuery = {
  Id: string;
  Year: number;
  Type: DiagramRangeBuyPriceType;
}

export type NumberSoldInARangeQuery = {
  Id: string;
  Year: number;
  Type: DiagramRangeSoldType;
}

export interface MyGoodsServiceInterface {
  getMyGoodses(
    query: GetMyGoodsesSearchQuery
  ): Observable<MyGoodsesListContainerDto>;
  getMyGoodsesRelation(
    query: GetMyGoodsesRelationQuery
  ): Observable<MyGoodsRelationDto[]>;
  checkDuplicateBarcode(
    query: CheckDuplicateBarcodeInAnEnterpriseQuery
  ): Observable<boolean>;
  create(form: any): Observable<void>;
  update(form: any): Observable<void>;
  addStock(data: AddStockCommand): Observable<void>;
  adjustStock(data: AdjustStockCommand): Observable<void>;
  changeSellPrice(
    data: UpdateGoodsSellingPriceCommand
  ): Observable<void>;
  getInfoGoodsForUpdate(
    query: GetInfoOfGoodsForUpdatingQuery
  ): Observable<InfoOfGoodsForUpdatingDto>;

  getListProductSellPrice(
    query: SellPriceChangeInARangeQuery
  ): Observable<ResultSellPriceLineDiagram>;
  getListProductBuyPrice(
    query: BuyPriceChangeInARangeQuery
  ): Observable<ResultBuyPriceLineDiagram>;
  getListProductNSold(
    query: NumberSoldInARangeQuery
  ): Observable<ResultSoldLineDiagram>;
}


@Injectable({
  providedIn: 'root'
})
export class ProductApiService implements MyGoodsServiceInterface {
  constructor(
    private httpClient: HttpClient,
    private utilService: FormValueToFormDataConverterService
  ) { }
  getMyGoodses(
    query: GetMyGoodsesSearchQuery
  ): Observable<MyGoodsesListContainerDto> {
    return this.httpClient.get<MyGoodsesListContainerDto>(
      '/api/MyGoods/GetMyGoodses',
      { params: query }
    );
  }
  getMyGoodsesRelation(
    query: GetMyGoodsesRelationQuery
  ): Observable<MyGoodsRelationDto[]> {
    const param = this.utilService.convertModelToHttpParams(query);
    return this.httpClient.get<MyGoodsRelationDto[]>(
      '/api/MyGoods/GetMyGoodsesRelation',
      { params: param }
    );
  }
  checkDuplicateBarcode(
    query: CheckDuplicateBarcodeInAnEnterpriseQuery
  ): Observable<boolean> {
    return this.httpClient.get<boolean>('/api/MyGoods/CheckDuplicateBarcode', {
      params: query,
    });
  }
  create(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<void>('/api/MyGoods/Create', data);
  }
  updateInfo(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>('/api/MyGoods/UpdateInfo', data);
  }
  addItem(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.post<void>('/api/MyGoods/AddItem', data);
  }
  update(form: any): Observable<void> {
    const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>('/api/MyGoods/Update', data);
  }

  addStock(data: AddStockCommand): Observable<void> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>('/api/MyGoods/AddStock', data);
  }
  adjustStock(data: AdjustStockCommand): Observable<void> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>(
      '/api/MyGoods/AdjustStock',
      data
    );
  }
  changeSellPrice(
    data: UpdateGoodsSellingPriceCommand
  ): Observable<void> {
    // const data = this.utilService.convertModelToFormData(form, null, null);
    return this.httpClient.put<void>(
      '/api/MyGoods/UpdateSellingPrice',
      data
    );
  }
  getInfoGoodsForUpdate(
    query: GetInfoOfGoodsForUpdatingQuery
  ): Observable<InfoOfGoodsForUpdatingDto> {
    return this.httpClient.get<InfoOfGoodsForUpdatingDto>(
      '/api/MyGoods/GetInfoOfGoodsForUpdating',
      { params: query }
    );
  }

  getListProductSellPrice(
    query: SellPriceChangeInARangeQuery
  ): Observable<ResultSellPriceLineDiagram> {
    return this.httpClient.get<ResultSellPriceLineDiagram>(
      '/api/MyGoods/GetListProductSellPrice',
      { params: query }
    );
  }
  getListProductBuyPrice(
    query: BuyPriceChangeInARangeQuery
  ): Observable<ResultBuyPriceLineDiagram> {
    return this.httpClient.get<ResultBuyPriceLineDiagram>(
      '/api/MyGoods/GetListProductBuyPrice',
      { params: query }
    );
  }
  getListProductNSold(
    query: NumberSoldInARangeQuery
  ): Observable<ResultSoldLineDiagram> {
    return this.httpClient.get<ResultSoldLineDiagram>(
      '/api/MyGoods/GetListProductNSold',
      { params: query }
    );
  }
}
