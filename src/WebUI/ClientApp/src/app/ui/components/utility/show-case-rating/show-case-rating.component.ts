import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faStar, faStarHalf} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-case-rating',
  templateUrl: './show-case-rating.component.html',
  styleUrls: ['./show-case-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class ShowCaseRatingComponent implements OnInit {

  @Input() rating = 0;
  stars: number[] = [];
  fullstar = faStar;
  halfstar = faStarHalf;
  constructor() { }

  ngOnInit(): void {
    console.log(this.rating);
    const fl = Math.floor(this.rating);
    for (let i = 0; i < fl; i++){
      this.stars.push(1);
    }
    if (this.rating - fl >= 0.5){
      this.stars.push(0.5);
    }
  }

}
