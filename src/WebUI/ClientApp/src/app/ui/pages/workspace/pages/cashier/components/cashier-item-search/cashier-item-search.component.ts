import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MyGoodsForCashierDto } from 'src/app/domain/backend/Dtos';
// import { MyGoodsForCashierDto } from 'src/app/shared/types/Dtos';

@Component({
  selector: 'app-cashier-item-search',
  templateUrl: './cashier-item-search.component.html',
  styleUrls: ['./cashier-item-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    CurrencyPipe
  ]
})
export class CashierItemSearchComponent implements OnInit {

  @Input() item!: MyGoodsForCashierDto;

  constructor() { }

  ngOnInit(): void {
  }

}
