import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { v1 as uuidV1 } from 'uuid';
import { MyGoodsForCashierDto } from './pos-cashier-api.service';

export type WholesalepricesItem = {
  wholesalerPrice: number;
  wholesalerMin: number;
  id: string;
};

export type POSCashierItem = {
  id: string;
  enterpriseId: string;
  barcode: string;
  name: string;
  price: number;
  basePriceUsed: number;
  wholessalePrices: WholesalepricesItem[];
  isWholesalerPriceAuto: boolean;
  isWholesalerPriceUsed: boolean;
  isWholesaleAvailable: boolean;
  goodsPackaging: string;
  promos: any[];
  singlePriceDisc: number;
  totalPriceDisc: number;
  usedPrice: number;
  tempUsedTotalPrice: number;
  usedTotalPrice: number;
  qty: number;
};
export type POSCashierContainerItem = {
  items: POSCashierItem[];
  totalPayment: number;
  payment: number;
  paymentFormatted: string | null;
  return: number;
};
export type POSCashierList = {
  [queue: string]: POSCashierContainerItem;
};

export type CurrentPOSCashierContainerItem = {
  index: string;
  data: POSCashierContainerItem;
};

@Injectable({
  providedIn:'root'
})
export class PosCashierDataService {
  private POSList: BehaviorSubject<POSCashierList> =
    new BehaviorSubject<POSCashierList>({});
  private CurrentPOSList: BehaviorSubject<CurrentPOSCashierContainerItem> =
    new BehaviorSubject<CurrentPOSCashierContainerItem>({
      index: '',
      data: null,
    });
  constructor() {
    this.addBuffer();
    // this.POSList.subscribe(x=>console.log(x));
    // this.CurrentPOSList.subscribe(x=>console.log(x));
  }

  // Buffer queue
  getKeys(): Observable<string[]> {
    return this.POSList.asObservable().pipe(map((x) => Object.keys(x)));
  }
  getCurrent(): Observable<CurrentPOSCashierContainerItem> {
    return this.CurrentPOSList.asObservable();
  }
  checkKey(key: string): boolean {
    return !!this.POSList.value[key];
  }
  addBuffer(desireKey: string | null = null): void {
    const temp = this.POSList.value;
    const key = desireKey ?? uuidV1();
    temp[key] = {
      items: [],
      payment: 0,
      return: 0,
      totalPayment: 0,
      paymentFormatted: null,
    };
    this.POSList.next(temp);
    this.changeCurrentIndex(key);
  }
  changeCurrentIndex(index: string, ignoreCurrent: boolean = false): void {
    const curPosList = this.CurrentPOSList.value;
    if (curPosList.index !== '' && ignoreCurrent === false) {
      const temp = this.POSList.value;
      temp[curPosList.index] = curPosList.data;
      this.POSList.next(temp);
    }
    if (this.checkKey(index)) {
      this.CurrentPOSList.next({
        index: index,
        data: this.POSList.value[index],
      });
    }
  }

  removeBuffer(index: string | null = null): void {
    const key = index ?? this.CurrentPOSList.value.index;
    const temp = this.POSList.value;
    delete temp[key];
    const props = Object.keys(temp);
    if (props.length < 1) {
      this.CurrentPOSList.next({
        index: '',
        data: null,
      });
      this.addBuffer();
    } else {
      this.POSList.next(temp);
      this.changeCurrentIndex(props[props.length - 1], true);
    }
  }
  // End Buffer Queue

  // Item of Queue
  addItem(item: MyGoodsForCashierDto): void {
    const temp = this.CurrentPOSList.value;
    const data = temp.data;

    const indexProd = data.items.findIndex((x) => x.barcode === item.barcode);
    if (indexProd === -1) {
      data.items.push(this._convertDTOtoItem(item));
    } else {
      data.items[indexProd] = this._createNewObjectForAdd(
        data.items[indexProd]
      );
    }

    this._updateTotalMustPay(data);
  }
  // update(index: string, data: POSCashierContainerItem): void{
  //   const temp = this.POSList.value;
  //   temp[index] = data;
  //   this.POSList.next(temp);
  // }
  updateMoneyPayed(nomnial: number): void {
    const data = this.CurrentPOSList.value.data;
    data.payment = nomnial;
    this._updateTotalMustPay(data);
  }
  changeQty(id: string, val: number): void {
    const data = this.CurrentPOSList.value.data;
    let item = data.items.find((x) => x.id === id);
    const itemIndex = data.items.findIndex((x) => x.id === id);
    item.qty = val;
    if (item.qty <= 0) {
      if (itemIndex > -1) {
        data.items.splice(itemIndex, 1);
      }
    } else {
      item = this._calculateUsedTotalPrice(item);
      data.items[itemIndex] = { ...item };
    }
    this._updateTotalMustPay(data);
  }
  toggleWholesaler(id: string, checked: boolean): void {
    const data = this.CurrentPOSList.value.data;
    let item = data.items.find((x) => x.id === id);
    const itemIndex = data.items.findIndex((x) => x.id === id);

    if (item !== null && item !== undefined) {
      item.isWholesalerPriceUsed = checked;

      let t: number = item.price;
      if (item.isWholesalerPriceUsed === true) {
        item.wholessalePrices.forEach((element) => {
          if (element.wholesalerMin <= item.qty) {
            t = element.wholesalerPrice;
          }
        });
      }

      item.basePriceUsed = item.isWholesalerPriceUsed ? t : item.price;

      item = this._calculateUsedTotalPrice(item);
      data.items[itemIndex] = { ...item };
    }
  }
  singleDiscChange(id: string, val: number): void {
    const data = this.CurrentPOSList.value.data;
    let item = data.items.find((x) => x.id === id);
    const itemIndex = data.items.findIndex((x) => x.id === id);
    if (item) {
      item.singlePriceDisc = val;
      item = this._calculateUsedTotalPrice(item);
      data.items[itemIndex] = { ...item };
      this._updateTotalMustPay(data);
    }
  }
  totalDiscChange(id: string, val: number): void {
    const data = this.CurrentPOSList.value.data;
    let item = data.items.find((x) => x.id === id);
    const itemIndex = data.items.findIndex((x) => x.id === id);
    if (item) {
      item.totalPriceDisc = val;
      item = this._calculateUsedTotalPrice(item);
      data.items[itemIndex] = { ...item };
      this._updateTotalMustPay(data);
    }
  }
  private _calculateUsedTotalPrice(item: POSCashierItem): POSCashierItem {
    let isWholesaleOk = false;
    let wholesaleUsed = item.price;
    for (let index = 0; index < item.wholessalePrices.length; index++) {
      const element = item.wholessalePrices[index];
      if (element.wholesalerMin <= item.qty) {
        isWholesaleOk = true;
        wholesaleUsed = element.wholesalerPrice;
      }
    }
    // const isWholesalerPriceUsed = item.isWholesalerPriceAuto || isWholesaleOk ? true : false;
    // if (item.isWholesalerPriceAuto || item.isWholesalerPriceUsed){
    item.isWholesalerPriceUsed =
      (item.isWholesalerPriceAuto || item.isWholesalerPriceUsed) &&
      isWholesaleOk;
    // }
    item.isWholesaleAvailable = isWholesaleOk;
    item.basePriceUsed = item.isWholesalerPriceUsed
      ? wholesaleUsed
      : item.price;
    item.usedPrice = item.basePriceUsed - item.singlePriceDisc;
    item.tempUsedTotalPrice = item.usedPrice * item.qty;
    item.usedTotalPrice = item.tempUsedTotalPrice - item.totalPriceDisc;
    return item;
  }
  private _updateTotalMustPay(
    dataProcess: POSCashierContainerItem | null = null
  ): void {
    let total = 0;
    const data = dataProcess ?? this.CurrentPOSList.value.data;
    data.items.forEach((element) => {
      total += element.usedTotalPrice;
    });
    data.totalPayment = total;
    data.return = data.payment - data.totalPayment;
    this.CurrentPOSList.next({
      index: this.CurrentPOSList.value.index,
      data: data,
    });
  }
  private _convertDTOtoItem(item: MyGoodsForCashierDto): POSCashierItem {
    let isWholesaleOk = false;
    let wholesaleUsed = item.price;
    for (let index = 0; index < item.wholessalePrices.length; index++) {
      const element = item.wholessalePrices[index];
      if (element.wholesalerMin <= 1) {
        isWholesaleOk = true;
        wholesaleUsed = element.wholesalerPrice;
        break;
      }
    }
    const isWholesalerPriceUsed = item.isWholesalerPriceAuto && isWholesaleOk;
    const basePriceUsed = isWholesalerPriceUsed ? wholesaleUsed : item.price;
    const usedPrice = basePriceUsed;

    return {
      barcode: item.barcode,
      enterpriseId: item.enterpriseId,
      goodsPackaging: item.goodsPackaging,
      id: item.id,
      isWholesalerPriceAuto: item.isWholesalerPriceAuto,
      basePriceUsed,
      isWholesalerPriceUsed,
      name: item.name,
      price: item.price,
      promos: item.promos,
      qty: 1,
      isWholesaleAvailable: isWholesaleOk,
      singlePriceDisc: 0,
      totalPriceDisc: 0,
      usedPrice,
      usedTotalPrice: usedPrice,
      wholessalePrices: item.wholessalePrices,
      tempUsedTotalPrice: usedPrice,
    };
  }
  private _createNewObjectForAdd(item: POSCashierItem): POSCashierItem {
    const incrementQty = item.qty + 1;
    let isWholesaleOk = false;
    let wholesaleUsed = item.price;
    for (let index = 0; index < item.wholessalePrices.length; index++) {
      const element = item.wholessalePrices[index];
      if (element.wholesalerMin <= incrementQty) {
        isWholesaleOk = true;
        wholesaleUsed = element.wholesalerPrice;
      }
    }
    const isWholesalerPriceUsed =
      (item.isWholesalerPriceAuto || item.isWholesalerPriceUsed) &&
      isWholesaleOk;
    const basePriceUsed = isWholesalerPriceUsed ? wholesaleUsed : item.price;
    const usedPrice = basePriceUsed - item.singlePriceDisc;
    const tempUsedTotalPrice = incrementQty * usedPrice;
    const usedTotalPrice = tempUsedTotalPrice - item.totalPriceDisc;
    return {
      barcode: item.barcode,
      enterpriseId: item.enterpriseId,
      goodsPackaging: item.goodsPackaging,
      id: item.id,
      isWholesalerPriceAuto: item.isWholesalerPriceAuto,
      wholessalePrices: item.wholessalePrices,
      isWholesalerPriceUsed,
      name: item.name,
      price: item.price,
      promos: item.promos,
      qty: incrementQty,
      basePriceUsed,
      isWholesaleAvailable: isWholesaleOk,
      singlePriceDisc: item.singlePriceDisc,
      totalPriceDisc: item.totalPriceDisc,
      usedPrice,
      usedTotalPrice,
      tempUsedTotalPrice,
    };
  }
  // End Item of Queue
}
