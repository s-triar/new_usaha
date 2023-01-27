import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MyGoodsesListItemDto } from 'src/app/domain/backend/Dtos';

@Component({
  selector: 'app-my-product-list-item',
  templateUrl: './my-product-list-item.component.html',
  styleUrls: ['./my-product-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class MyProductListItemComponent implements OnInit {

  @Input() item!: MyGoodsesListItemDto;
  constructor() { }

  ngOnInit(): void {
  }

}
