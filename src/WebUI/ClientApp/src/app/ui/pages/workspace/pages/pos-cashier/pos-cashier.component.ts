import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MyGoodsForCashierDto,
  PosCashierApiService,
} from './services/pos-cashier-api.service';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  combineLatest,
  filter,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  takeWhile,
  take,
  takeLast,
} from 'rxjs';
import { MyEnterpriseDto } from 'src/app/domain/backend/Dtos';
import {
  WORKSPACE_ROUTE,
  WS_CASHIER,
  WS_PRODUCT,
} from 'src/app/core/constant/routes';
import {
  POSCashierContainerItem,
  PosCashierDataService,
} from './services/pos-cashier-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpConfirmationService } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { WorkspaceStateService } from '../../components/workspace-nav/workspace-state.service';
import { PrintService } from 'ng-thermal-print';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MyEnterpriseService } from 'src/app/infrastructure/backend/my-enterprise.service';
import {
  CreateOrderCashierCommand,
  ItemOrdered,
} from 'src/app/domain/backend/Commands';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { SearchInputBarcodeComponent } from 'src/app/ui/components/search/search-input-barcode/search-input-barcode.component';
import { MatListModule } from '@angular/material/list';
import { PosCashierSearchComponent } from './components/pos-cashier-search/pos-cashier-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CashierEventDiscChange, CashierEventQtyChange, CashierEventToggleWholesalerChange, PosCashierItemComponent } from './components/pos-cashier-item/pos-cashier-item.component';
import { MatIconModule } from '@angular/material/icon';
import { InputCurrencyComponent } from 'src/app/ui/components/form/input-currency/input-currency.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QueueComponent } from './components/queue/queue.component';
export type ReceiptItem = {
  qty: string;
  name: string;
  price: string;
  subPrice: string;
};
export type Receipt = {
  enterpriseName: string;
  phone: string;
  receiptId: string;
  items: ReceiptItem[];
  total: string;
  payment: string;
  return: string;
  to: string;
};

@Component({
  selector: 'app-pos-cashier',
  standalone: true,
  templateUrl: './pos-cashier.component.html',
  styleUrls: ['./pos-cashier.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    PortalContainerComponent,
    SearchInputBarcodeComponent,
    PosCashierSearchComponent,
    PosCashierItemComponent,
    InputCurrencyComponent
  ],
  providers:[
    PosCashierApiService
  ]
})
export class PosCashierComponent implements OnInit {
  PARAM_WORKSPACE_ID_USAHA = WORKSPACE_ROUTE._ID_USAHA;
  PARAM_PRODUCT_ID_PRODUCT_INFO = WS_PRODUCT._ID_PRODUCT_INFO;
  icons = {
    queue: 'format_list_numbered',
    close: 'close',
    delete: 'delete',
    add: 'add',
  };

  formSearch = this.formBuilder.group({
    Search: this.formBuilder.control<string | null>(''),
  });
  searchList$: Observable<MyGoodsForCashierDto[]> =
    this.formSearch.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((x) => combineLatest([of(x), this.idUsaha$])),
      switchMap(([form, idusaha]) => {
        if (form.Search !== '') {
          return this.cashierService.get({
            Search: form.Search,
            EnterpriseId: idusaha,
          });
        } else {
          return of([]);
        }
      })
    );

  printerConnectionStatus$: Observable<boolean> =
    this.printService.isConnected.pipe(
      tap((result) => {
        if (result) {
          console.log('Connected to printer!!!');
          this.snackbar.open('Tersambung ke printer.', 'Ok', {
            duration: 1000,
          });
        } else {
          console.log('Not connected to printer.');
          this.snackbar.open('Gagal menyambungkan ke printer.', 'Ok', {
            duration: 1000,
          });
        }
      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  idUsaha$: Observable<string> = this.routes.parent?.params.pipe(
    map((params) => params[this.PARAM_WORKSPACE_ID_USAHA.substring(1)])
  );

  usahaInfo$: Observable<MyEnterpriseDto> = this.idUsaha$.pipe(
    switchMap((idusaha) =>
      this._myenterpriseService
        .getMyEnterpriseInfo({ Id: idusaha })
        .pipe(shareReplay({ refCount: true, bufferSize: 1 }))
    )
  );
 
  bufferOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  totalQueue$: Observable<string[]> = this.cashierDataService.getKeys().pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  indexQueueCurrent$: Observable<string> = this.cashierDataService.getCurrent().pipe(
    map(x=>x.index),
    distinctUntilChanged(),
    shareReplay({refCount:true, bufferSize:1})
  );

  currenPosList$: Observable<POSCashierContainerItem> = this.cashierDataService.getCurrent().pipe(
    map(x=>x.data),
    shareReplay({refCount:true,bufferSize:1})
  );

  

  constructor(
    private routes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cashierService: PosCashierApiService,
    private cashierDataService: PosCashierDataService,
    private confirmationService: PopUpConfirmationService,
    private notifService: PopUpNotifService,
    private wsStateService: WorkspaceStateService,
    private printService: PrintService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private _myenterpriseService: MyEnterpriseService
  ) {}
  ngOnInit(): void {
    // this.wsStateService.changeTab(WS_CASHIER._KEY_);
    // this.wsStateService.HideWsfooter();
    this.wsStateService.changeViewState({
      currentTab: WS_CASHIER._KEY_,
      isFooterBarNeedToBeShown: false,
      isSearchBarNeedToBeShown: true,
      isTabBarNeedToBeShown: true,
    });
  }
  // Buffer Queue
  toggleBuffer(): void {
    this.bufferOpened$.next(!this.bufferOpened$.value);
  }
  removeBuffer(): void {
    this.cashierDataService.removeBuffer();
  }
  addBuffer(): void {
    this.dialog
      .open(QueueComponent, {
        autoFocus: true,
        disableClose: false,
        hasBackdrop: true,
      })
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        takeLast(1)
      )
      .subscribe((x) => {
        if (typeof x === 'string') {
          this.cashierDataService.addBuffer(x);
        } else {
          this.cashierDataService.addBuffer();
        }
      });
  }
  changeBuffer(index: string): void {
    this.cashierDataService.changeCurrentIndex(index);
  }
  // End Buffer Queue

  private createPaymentCommand(
    currentIndex: string,
    idusaha: string,
    data: POSCashierContainerItem
  ): CreateOrderCashierCommand {
    const temp: CreateOrderCashierCommand = {
      Items: [],
      Payment: data.payment,
      Return: data.return,
      Total: data.totalPayment,
      EnterpriseId: idusaha,
      To: currentIndex,
    };
    data.items.forEach((x) => {
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

  // Printer
  private printReceipt(data: Receipt): void {
    // print store
    let printing = this.printService
      .init()
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
    for (const item of data.items) {
      printing = printing
        .setBold(false)
        .setJustification('left')
        .writeLine(`${item.name}`)
        .setJustification('right')
        .writeLine(
          this.middleSpacing(`${item.qty} x ${item.subPrice}`, item.price)
        );
    }
    printing = printing.writeLine(`________________________________`);
    // print payment detail
    printing
      .setBold(false)
      .setJustification('right')
      .writeLine(this.middleSpacing('Total:', data.total))
      .writeLine(this.middleSpacing('Bayar:', data.payment))
      .writeLine(this.middleSpacing('Kembalian:', data.return))
      .feed(3)
      .cut('full')
      .flush();
  }

  private middleSpacing(
    left: string,
    right: string,
    charNumber: number = 32
  ): string {
    let res = left;
    const lDataLeft = left.length;
    const lDataRight = right.length;
    const lSpace = charNumber - (lDataLeft + lDataRight);
    for (let i = 0; i < lSpace; i++) {
      res += ' ';
    }
    res += right;
    return res;
  }
  private createStringReceipt(
    idReceipt: string,
    currentIndex: string,
    usahaInfo: MyEnterpriseDto,
    data: POSCashierContainerItem
  ): Receipt {
    const items: ReceiptItem[] = [];
    for (const item of data.items) {
      items.push({
        name: item.name,
        price: item.usedTotalPrice.toString(),
        qty: item.qty.toString(),
        subPrice: item.usedPrice.toString(),
      });
    }
    const res: Receipt = {
      enterpriseName: usahaInfo.name,
      phone: usahaInfo.phone,
      total: data.totalPayment.toString(),
      payment: data.payment.toString(),
      return: data.return.toString(),
      items,
      receiptId: idReceipt,
      to: currentIndex,
    };

    return res;
  }
  // End Printer

  // pos cashier
  // update(event: POSCashierContainerItem): void {
  //   this.indexQueueCurrent$.pipe(takeLast(1)).subscribe((index) => {
  //     this.cashierDataService.update(index, event);
  //   });
  // }
  pay(): void{
    const dialogRef = this.confirmationService.show({
      message: 'Periksa kembali produk-produk, kuantitas produk-produk, dan Uang Pembayaran. Tekan OK untuk melanjutkan.',
      title: 'Apakah Anda Yakin?',
      buttonTheme: 'primary'
    });
    dialogRef.afterClosed()
      .pipe(
        filter(x => !!x),
        switchMap(paymenConfirm=>{
          return combineLatest([
            this.printerConnectionStatus$,
            this.usahaInfo$,
            this.indexQueueCurrent$,
            this.currenPosList$,
          ])
        }),
        take(1),
        tap(([printerConStatus, usahaInfo, indexQueue, itemsPurchase])=>console.log(printerConStatus, usahaInfo, indexQueue, itemsPurchase)),
        switchMap(
          ([printerConStatus, usahaInfo, indexQueue, itemsPurchase]) =>
            this.cashierService
              .pay(
                this.createPaymentCommand(indexQueue, usahaInfo.id, itemsPurchase)
              )
              .pipe(
                map((x) => x.id),
                switchMap(x => 
                  this.notifService.show({message: 'Pembayaran berhasil dilakukan.', title: 'Sukses', type: 'success'})
                                  .afterClosed()
                                  .pipe(
                                    map(()=>x),
                                    switchMap((idReceipt) => {
                                      return combineLatest([
                                        of(printerConStatus),
                                        of(idReceipt),
                                        of(usahaInfo),
                                        of(indexQueue),
                                        of(itemsPurchase),
                                      ]);
                                    })
                                  )),
                
              )
        ),
        tap(
          ([printerConStatus, idReceipt, usahaInfo, indexQueue, itemsPurchase]) => {
            if (printerConStatus === false) {
              this.notifService.show({
                type: 'warning',
                message: 'Printer tidak tersambung',
                title: 'Perhatian!',
              });
            }
          }
        ),
        tap(([printerConStatus, idReceipt, usahaInfo, indexQueue, itemsPurchase]) =>
          this.removeBuffer()
        ),
        filter(
          ([printerConStatus, idReceipt, usahaInfo, indexQueue, itemsPurchase]) =>
            !!printerConStatus
        ),
        map(
          ([printerConStatus, idReceipt, usahaInfo, indexQueue, itemsPurchase]) => {
            return this.createStringReceipt(
              idReceipt,
              indexQueue,
              usahaInfo,
              itemsPurchase
            );
          }
        ),
    ).subscribe(receipt => {
        this.printReceipt(receipt);
    });
  }
  cancel(): void {
    const dialogRef = this.confirmationService.show({
      message:
        'Pembatalan akan menyebabkan item-item yang sudah ada di POS kasir buffer ini hilang. Tekan OK untuk melanjutkan.',
      title: 'Apakah Anda Yakin?',
      buttonTheme: 'primary',
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((x) => !!x)
      )
      .subscribe((x) => {
        this.removeBuffer();
      });
  }
  // end pos cashier

  // Item
  addItem(item: MyGoodsForCashierDto): void{
    console.log(item);
    
    this.cashierDataService.addItem(item);
    this.formSearch.patchValue({
      Search:''
    });
  }
  singleDiscChange(event: CashierEventDiscChange):void{
    console.log(event);
    this.cashierDataService.singleDiscChange(event.id, event.value);
  }
  totalDiscChange(event: CashierEventDiscChange):void{
    this.cashierDataService.totalDiscChange(event.id, event.value);
  }
  changeQty(event: CashierEventQtyChange):void{
    this.cashierDataService.changeQty(event.id,event.value);
  }
  toggleWholesaler(event: CashierEventToggleWholesalerChange):void{
    this.cashierDataService.toggleWholesaler(event.id,event.value);
  }
  // end item

  // total
  updatePayment(c:InputCurrencyComponent):void{
    this.cashierDataService.updateMoneyPayed(c.value);
  }
  // end total
}
