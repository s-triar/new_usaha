import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ShowCaseRatingComponent } from '../../utility/show-case-rating/show-case-rating.component';
import { MatIconModule } from '@angular/material/icon';
import { PRODUCT_DEFAULT } from 'src/app/core/constant';
export type EnterpriseItemShow = {
  name: string;
  category: string;
  description: string;
  distance: number;
  rating: number;
  image: string;
};

@Component({
  selector: 'app-show-case-shop-item',
  templateUrl: './show-case-shop-item.component.html',
  styleUrls: ['./show-case-shop-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    ShowCaseRatingComponent
  ]
})
export class ShowCaseShopItemComponent implements OnInit {
  @Input() path!: string;
  @Input() data: EnterpriseItemShow = {
    name: 'Name Toko',
    category: 'kategori',
    description: 'deskripsi',
    distance: 0,
    rating: 4,
    image: PRODUCT_DEFAULT
  };
  iconLoc = 'place';
  constructor() { }

  ngOnInit(): void {
  }

}
