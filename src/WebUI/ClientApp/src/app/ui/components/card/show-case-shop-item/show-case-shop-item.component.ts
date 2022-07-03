import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { MatCardModule } from '@angular/material/card';
import { ShowCaseRatingComponent } from '../../utility/show-case-rating/show-case-rating.component';
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
    FontAwesomeModule,
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
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
  };
  iconLoc = faLocationPin;
  constructor() { }

  ngOnInit(): void {
  }

}
