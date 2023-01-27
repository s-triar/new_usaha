import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MyGoodsForCashierDto } from '../../services/pos-cashier-api.service';

@Component({
  selector: 'app-pos-cashier-search',
  templateUrl: './pos-cashier-search.component.html',
  styleUrls: ['./pos-cashier-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    CurrencyPipe
  ]
})
export class PosCashierSearchComponent {
  @Input() item!: MyGoodsForCashierDto;

  constructor() { }


}
