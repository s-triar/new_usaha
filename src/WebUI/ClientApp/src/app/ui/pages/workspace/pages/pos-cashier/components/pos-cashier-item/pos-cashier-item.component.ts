import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySlideToggleChange as MatSlideToggleChange, MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { InputCurrencyComponent } from 'src/app/ui/components/form/input-currency/input-currency.component';
import { POSCashierItem } from '../../services/pos-cashier-data.service';

export interface CashierEventDiscChange {
  value: number;
  id: string;
}

export interface CashierEventQtyChange {
  value: number;
  id: string;
}
export interface CashierEventToggleWholesalerChange {
  value: boolean;
  id: string;
}

@Component({
  selector: 'app-pos-cashier-item',
  standalone: true,
  templateUrl: './pos-cashier-item.component.html',
  styleUrls: ['./pos-cashier-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    InputCurrencyComponent,
    MatSnackBarModule,
  ],
  providers: [
    CurrencyPipe, 
  ]
})
export class PosCashierItemComponent implements OnInit  {
  
  @Input() item!: POSCashierItem;

  @Output() newlyAdded = new EventEmitter();

  @Output() singleDiscChange = new EventEmitter<CashierEventDiscChange>();
  @Output() totalDiscChange = new EventEmitter<CashierEventDiscChange>();
  @Output() qtyChange = new EventEmitter<CashierEventQtyChange>();
  @Output() wholesalerToggleChange = new EventEmitter<CashierEventToggleWholesalerChange>();

  isAdditionalPanelOpened = false;
  @ViewChild('qtyinput', {static: true}) qtyInput!: ElementRef;

  constructor(){}

  ngOnInit(): void {
    this.newlyAdded.emit();
  }

  toogleAdditionalPanel(): void{
    this.isAdditionalPanelOpened = !this.isAdditionalPanelOpened;
  }
  changeSingleDisc(element: InputCurrencyComponent): void{
    const p = element.value;
    this.singleDiscChange.emit({
      value: p!,
      id: this.item.id,
    });
  }

  changeTotalDisc(element: InputCurrencyComponent): void{
    const p = element.value;
    this.totalDiscChange.emit({
      value: p!,
      id: this.item.id,
    });
  }
  toggleWholesaler(element: MatSlideToggleChange): void{
    this.wholesalerToggleChange.emit({
      value: element.checked,
      id: this.item.id
    });
  }
  changeQty(element: Event): void{
    const p = (element.target as HTMLInputElement)
    this.qtyChange.emit({
      value: parseFloat(p.value),
      id: this.item.id
    });
  }
}
