import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faClose, faList, faPlug, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PrintService } from 'ng-thermal-print';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { WORKSPACE_ROUTE, WS_CASHIER, WS_PRODUCT } from 'src/app/core/constant/routes';
import { POSCashierContainerItem } from 'src/app/core/types';
import { CreateOrderCashierCommand, ItemOrdered } from 'src/app/domain/backend/Commands';
import { MyEnterpriseDto, MyGoodsForCashierDto } from 'src/app/domain/backend/Dtos';
import { MyEnterpriseService } from 'src/app/infrastructure/backend/my-enterprise.service';
import { PopUpConfirmationService } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
// import { PopUpKuConfirmationService } from 'src/app/components/pop-up-ku/pop-up-ku-confirmation/pop-up-ku-confirmation.service';
// import { PopUpKuNotifService } from 'src/app/components/pop-up-ku/pop-up-ku-notif/pop-up-ku-notif.service';
// import { POSCashierContainerItem, POSCashierList } from 'src/app/shared/interfaces';
// import { CreateOrderCashierCommand, ItemOrdered } from 'src/app/shared/types/Commands';
// import { MyGoodsForCashierDto } from 'src/app/shared/types/Dtos';
// import { WORKSPACE_ROUTE, WS_CASHIER, WS_PRODUCT } from 'src/app/shared/values/routes';
import { WorkspaceStateService } from '../../components/workspace-nav/workspace-state.service';
import { AddQueuePopupComponent } from './components/add-queue-popup/add-queue-popup.component';
import { CashierContainerCancelEvent, CashierContainerPayEvent, CashierContainerUpdateEvent, CashierItemContainerComponent } from './components/cashier-item-container/cashier-item-container.component';
import { CashierItemSearchComponent } from './components/cashier-item-search/cashier-item-search.component';
import { CashierDataService } from './services/cashier-data.service';
import { CashierService } from './services/cashier.service';

export type ReceiptItem= {
  qty: string,
  name: string,
  price: string,
  subPrice: string;
};

export type Receipt = {
  enterpriseName: string,
  phone: string,
  receiptId: string,
  items: ReceiptItem[],
  total: string,
  payment: string,
  return: string,
  to: string
};

@UntilDestroy()
@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    ReactiveFormsModule,
    SearchInputBarcodeComponent,
    MatListModule,
    CashierItemSearchComponent,
    MatToolbarModule,
    MatButtonModule,
    CashierItemContainerComponent,
    MatIconModule,
    FormsModule
  ]
})
export class CashierComponent implements OnInit {
  icons = {
    queue: 'format_list_numbered',
    close: 'close',
    delete: 'delete',
    add: 'add'
  };
  printerConnectionStatus = false;
  idUsaha!: string;
  usahaInfo!: MyEnterpriseDto;
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  PARAM_PRODUCT_ID_PRODUCT_INFO = WS_PRODUCT._ID_PRODUCT_INFO;
  bufferOpened = false;
  temp: number[] = [];
  posList!: POSCashierContainerItem;
  totalQueue!: string[];
  indexQueueCurrent = '';
  searchList$: Observable<MyGoodsForCashierDto[]> = of([]);
  formSearch = this.formBuilder.group({
    Search: this.formBuilder.control<string|null>('')
  });

  constructor(private routes: ActivatedRoute,
              private formBuilder: FormBuilder,
              private cashierService: CashierService,
              private cashierDataService: CashierDataService,
              private confirmationService: PopUpConfirmationService,
              private notifService: PopUpNotifService,
              private wsStateService: WorkspaceStateService,
              private printService: PrintService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              private _myenterpriseService: MyEnterpriseService
    ) {
      this.printService.isConnected.subscribe(result => {
        this.printerConnectionStatus = result;
        if (result) {
          console.log('Connected to printer!!!');
          this.snackbar.open('Tersambung ke printer.', 'Ok', {duration: 1000});
        } else {
          console.log('Not connected to printer.');
          this.snackbar.open('Gagal menyambungkan ke printer.', 'Ok', {duration: 1000});
        }
    });
  }
  update(event: CashierContainerUpdateEvent ): void{
    this.cashierDataService.update(event.index, event.data);
  }
  pay(event: CashierContainerPayEvent ): void{
    const dialogRef = this.confirmationService.show({
      message: 'Periksa kembali produk-produk, kuantitas produk-produk, dan Uang Pembayaran. Tekan OK untuk melanjutkan.',
      title: 'Apakah Anda Yakin?',
      buttonTheme: 'primary'
    });
    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(x => !!x),
        switchMap(x => this.cashierService.pay(this.createPaymentCommand(this.posList))),
        switchMap(x => this.notifService.show({message: 'Pembayaran berhasil dilakukan.', title: 'Sukses', type: 'success'}).afterClosed())
    ).subscribe(x => {
        this.printReceipt(this.createStringReceipt(x, this.posList));
        this.removeBuffer();
    });
  }
  private printReceipt(data: Receipt): void{
    if (!this.printerConnectionStatus){
      this.notifService.show({type: 'warning', message: 'Printer tidak tersambung', title: 'Perhatian!'});
      return;
    }

    // print store
    let printing = this.printService.init()
        .setJustification('center')
        .setBold(true)
        .setSize('normal')
        .writeLine(data.enterpriseName)
        .setBold(true)
        .setSize('normal')
        .writeLine(data.phone)
        .setJustification('left')
        .writeLine(`Id: ${data.receiptId}`);
    printing = printing.writeLine();

    // print item
    for (const item of data.items){
      printing = printing
                  .setBold(false)
                  .setJustification('left')
                  .writeLine(`${item.name}`)
                  .setJustification('right')
                  .writeLine(this.middleSpacing((`${item.qty} x ${item.subPrice}`), item.price));
    }
    printing = printing.writeLine(`________________________________`);
    // print payment detail
    printing.setBold(false)
            .setJustification('right')
            .writeLine(this.middleSpacing('Total:', data.total))
            .writeLine(this.middleSpacing('Bayar:', data.payment))
            .writeLine(this.middleSpacing('Kembalian:', data.return))
            .feed(3)
            .cut('full')
            .flush();

  }
  private middleSpacing(left: string, right: string, charNumber: number= 32): string{
    let res = left;
    const lDataLeft = left.length;
    const lDataRight = right.length;
    const lSpace = charNumber - (lDataLeft + lDataRight);
    for (let i = 0; i < lSpace; i++){
      res += ' ';
    }
    res += right;
    return res;
  }
  private createStringReceipt(id: string, data: POSCashierContainerItem): Receipt{
    const items: ReceiptItem[] = [];
    for (const item of data.items){
      items.push({
        name: item.name,
        price: item.usedTotalPrice.toString(),
        qty: item.qty.toString(),
        subPrice: item.usedPrice.toString()
      });
    }
    const res: Receipt = {
      enterpriseName: this.usahaInfo.name,
      phone: this.usahaInfo.phone,
      total: data.totalPayment.toString(),
      payment: data.payment.toString(),
      return: data.return.toString(),
      items,
      receiptId: id,
      to: this.indexQueueCurrent
    };

    return res;
  }

  private createPaymentCommand(data: POSCashierContainerItem): CreateOrderCashierCommand{
    const temp: CreateOrderCashierCommand = {
      Items : [],
      Payment: data.payment,
      Return: data.return,
      Total: data.totalPayment,
      EnterpriseId: this.idUsaha,
      To: this.indexQueueCurrent
    };
    data.items.forEach(x => {

      // let t:number=x.price;
      // if(x.isWholesalerPriceUsed===true){
      //   x.wholessalePrices.forEach(elm => {
      //     if(elm.wholesalerMin <= x.qty){
      //       t = elm.wholesalerPrice;
      //     }
      //   });
      // }

      const tempItem: ItemOrdered = {
        GoodsId: x.id,
        IsWholesalerPrice: x.isWholesalerPriceUsed,
        N: x.qty,
        DiscountItem: x.singlePriceDisc,
        DiscountItemTotal: x.totalPriceDisc,
        PricePerItem: x.basePriceUsed, //x.isWholesalerPriceUsed ? x.wholesalerPrice : x.price,
        PricePerItemAfterDiscount: x.usedPrice,
        PriceTotal: x.tempUsedTotalPrice,
        PriceTotalAfterDiscount: x.usedTotalPrice,
        PriceTotalFinal: x.usedTotalPrice,
      };
      temp.Items.push(tempItem);
   });
    return temp;
  }

  cancel(event: CashierContainerCancelEvent): void{
    const dialogRef = this.confirmationService.show({
      message: 'Pembatalan akan menyebabkan item-item yang sudah ada di POS kasir buffer ini hilang. Tekan OK untuk melanjutkan.',
      title: 'Apakah Anda Yakin?',
      buttonTheme: 'primary'
    });
    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(x => !!x)
    ).subscribe(x => {
        this.removeBuffer();
    });
  }
  async addItem(item: string): Promise<void>{
    this.searchList$.pipe(take(1))
      .subscribe(list => {
        const p = list.find(y => y.id === item);
        if (p){
          this.cashierDataService.add(this.indexQueueCurrent, p);
          this.formSearch.controls.Search.setValue(null);
          this.formSearch.controls.Search.updateValueAndValidity();
        }
      });
  }
  ngOnInit(): void {
    // this.wsStateService.changeTab(WS_CASHIER._KEY_);
    // this.wsStateService.HideWsfooter();
    this.wsStateService.changeViewState({
      currentTab: WS_CASHIER._KEY_,
      isFooterBarNeedToBeShown: false,
      isSearchBarNeedToBeShown: true,
      isTabBarNeedToBeShown: true
    });
    this.loadData();
    this.routes.parent?.params.pipe(untilDestroyed(this)).subscribe(params => {
      console.log(params);
      this.idUsaha = params[this.PARAM_WORKSPACE_ID_USAHA.substring(1)];
    });
    this.searchProduct();
    this.getInfoUsaha();
  }
  getInfoUsaha():void{
    this._myenterpriseService.getMyEnterpriseInfo({Id:this.idUsaha})
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(
        x=> this.usahaInfo=x
      )
  }
  searchProduct(): void{
    this.formSearch.controls.Search
    .valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(400),
        distinctUntilChanged(),
        // switchMap(x => {
        //   console.log(x);
        //   if (x){
        //     return this.cashierService.get({Search: x});
        //   }else{
        //     return of([]);
        //   }
        // })
        )
        .subscribe(x => {
          console.log(x);
          if (x){
            this.searchList$ = this.cashierService.get({Search: x, EnterpriseId: this.idUsaha});
          }else{
            this.searchList$ = of([]);
          }
        });
  }
  changeBuffer(index: string): void{
    this.indexQueueCurrent = index;
    this.loadData();
  }
  loadData(): void{
    this.cashierDataService.POSList.pipe(
      untilDestroyed(this),
      map(x => x[this.indexQueueCurrent])
    ).subscribe(x => {
      this.posList = x;
    });
    this.cashierDataService.POSList.pipe(
      untilDestroyed(this),
      map(x => {
        const tempQueue = [];
        // tslint:disable-next-line:forin
        for (const key in x) {
          tempQueue.push(key);
        }
        return tempQueue;
    })).subscribe(x => {
      this.totalQueue = x;
      if (this.indexQueueCurrent === ''){
        this.changeBuffer(this.totalQueue[0]);
      }
    });
  }
  toggleBuffer(state: string): void{
    switch (state) {
      case 'open':
        this.bufferOpened = true;
        break;
      case 'close':
        this.bufferOpened = false;
        break;
      default:
        break;
    }
  }
  addBuffer(): void{
    this.dialog.open(AddQueuePopupComponent, {
      autoFocus: true,
      disableClose: false,
      hasBackdrop: true
    }).afterClosed()
    .pipe(
      filter(x => !!x),
    )
    .subscribe(x => {
      if (typeof(x) === 'string'){
        this.cashierDataService.addBuffer(x);
      }else{
        this.cashierDataService.addBuffer();
      }
    });
  }
  removeBuffer(): void{
    this.cashierDataService.removeBuffer(this.indexQueueCurrent);
    this.indexQueueCurrent = '';
    this.loadData();
  }
}
