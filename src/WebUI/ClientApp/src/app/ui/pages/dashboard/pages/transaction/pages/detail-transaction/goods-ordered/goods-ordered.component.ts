import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OrderGoodsList } from 'src/app/domain/backend/Dtos';


@Component({
  selector: 'app-goods-ordered',
  templateUrl: './goods-ordered.component.html',
  styleUrls: ['./goods-ordered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    CurrencyPipe,
  ]
})
export class GoodsOrderedComponent implements OnInit {

  @Input() data!: OrderGoodsList;
  isAdditionalPanelOpened = false;
  constructor() { }

  ngOnInit(): void {
  }
  toogleAdditionalPanel(): void{
    this.isAdditionalPanelOpened = !this.isAdditionalPanelOpened;
  }

}
